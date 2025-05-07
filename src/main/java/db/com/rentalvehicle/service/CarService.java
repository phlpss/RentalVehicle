package db.com.rentalvehicle.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import db.com.rentalvehicle.dto.AvailableDatesResponse;
import db.com.rentalvehicle.dto.CarCreateDTO;
import db.com.rentalvehicle.dto.CarSearchParameters;
import db.com.rentalvehicle.dto.CarSearchResult;
import db.com.rentalvehicle.dto.CarSearchSelectors;
import db.com.rentalvehicle.model.Car;
import db.com.rentalvehicle.model.Office;
import db.com.rentalvehicle.model.Rental;
import db.com.rentalvehicle.repository.CarRepository;
import db.com.rentalvehicle.repository.OfficeRepository;
import db.com.rentalvehicle.repository.RentalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class CarService {
    private final CarRepository carRepository;
    private final RentalRepository rentalRepository;
    private final OfficeRepository officeRepository;
    
    // Number of days to look ahead for availability
    private static final int DAYS_AHEAD = 90;

    public CarSearchResult getCarDetails(String carId) {
        Car car = carRepository.findById(carId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));
        
        return mapToSearchResult(car);
    }

    public boolean isAvailable(String carId, LocalDateTime start, LocalDateTime end) {
        // Check if car exists
        Optional<Car> carOpt = carRepository.findById(carId);
        if (carOpt.isEmpty()) {
            return false;
        }
        
        // Check if car is in available status
        Car car = carOpt.get();
        if (!"AVAILABLE".equals(car.getStatus())) {
            return false;
        }
        
        // Check if there are any overlapping rentals
        List<Rental> overlappingRentals = rentalRepository.findOverlappingRentals(carId, start, end);
        return overlappingRentals.isEmpty();
    }
    
    public AvailableDatesResponse getAvailableDates(String carId) {
        // Check if car exists
        Optional<Car> carOpt = carRepository.findById(carId);
        if (carOpt.isEmpty()) {
            return new AvailableDatesResponse(carId, List.of(), null, null);
        }
        
        // Check if car is in available status
        Car car = carOpt.get();
        if (!"AVAILABLE".equals(car.getStatus())) {
            return new AvailableDatesResponse(carId, List.of(), null, null);
        }
        
        // Get current date and the date 90 days from now
        LocalDate today = LocalDate.now();
        LocalDate endDate = today.plusDays(DAYS_AHEAD);
        
        // Get all rentals for this car
        List<Rental> carRentals = rentalRepository.findByCarId(carId);
        
        // Generate all dates between today and endDate
        List<LocalDate> allDates = IntStream.rangeClosed(0, DAYS_AHEAD)
                .mapToObj(today::plusDays)
                .collect(Collectors.toList());
        
        // Filter out dates that are not available
        List<LocalDate> availableDates = new ArrayList<>(allDates);
        
        for (Rental rental : carRentals) {
            LocalDate rentalStartDate = rental.getRentalStart().toLocalDate();
            LocalDate rentalEndDate = rental.getRentalEnd().toLocalDate();
            
            // Remove dates that are covered by existing rentals
            availableDates.removeIf(date -> 
                    !date.isBefore(rentalStartDate) && !date.isAfter(rentalEndDate));
        }
        
        // Get earliest and latest available dates
        LocalDate earliestAvailable = availableDates.isEmpty() ? null : availableDates.get(0);
        LocalDate latestAvailable = availableDates.isEmpty() ? null : availableDates.get(availableDates.size() - 1);
        
        return new AvailableDatesResponse(carId, availableDates, earliestAvailable, latestAvailable);
    }

    public void updateStatus(String carId, String status) {
        Optional<Car> carOpt = carRepository.findById(carId);
        if (carOpt.isPresent()) {
            Car car = carOpt.get();
            car.setStatus(status);
            carRepository.save(car);
        }
    }

    public CarSearchSelectors getSearchSelectors() {
        List<Car> cars = carRepository.findAll();
        
        CarSearchSelectors selectors = new CarSearchSelectors();
        
        // Get unique values for each selector
        selectors.setModels(cars.stream()
                .map(Car::getModel)
                .distinct()
                .toList());
                
        selectors.setCategories(cars.stream()
                .map(Car::getCategory)
                .distinct()
                .toList());
                
        selectors.setTransmissionTypes(cars.stream()
                .map(Car::getTransmissionType)
                .distinct()
                .toList());
                
        selectors.setFuelTypes(cars.stream()
                .map(Car::getFuelType)
                .distinct()
                .toList());

        selectors.setCities(cars.stream()
                .filter(car -> car.getOffice() != null)
                .map(car -> car.getOffice().getCity())
                .distinct()
                .toList());
        
        // Get min/max year
        selectors.setMinYear(cars.stream()
                .mapToInt(Car::getYear)
                .min()
                .orElse(0));
                
        selectors.setMaxYear(cars.stream()
                .mapToInt(Car::getYear)
                .max()
                .orElse(0));
        
        return selectors;
    }

    public List<CarSearchResult> searchCars(CarSearchParameters searchParameters) {
        return carRepository.findAll().stream()
                .filter(car->car.getStatus().equals("AVAILABLE"))
                .filter(car -> matchesSearchParameters(car, searchParameters))
                .map(this::mapToSearchResult)
                .collect(Collectors.toList());
    }

    private boolean matchesSearchParameters(Car car, CarSearchParameters parameters) {
        if (parameters.getModel() != null && !parameters.getModel().equals(car.getModel())) {
            return false;
        }
        if (parameters.getCategory() != null && !parameters.getCategory().equals(car.getCategory())) {
            return false;
        }
        if (parameters.getTransmissionType() != null && !parameters.getTransmissionType().equals(car.getTransmissionType())) {
            return false;
        }
        if (parameters.getFuelType() != null && !parameters.getFuelType().equals(car.getFuelType())) {
            return false;
        }
        if (parameters.getYear() != null && !parameters.getYear().equals(car.getYear())) {
            return false;
        }
        if (parameters.getCity() != null && (car.getOffice() == null || !parameters.getCity().equals(car.getOffice().getCity()))) {
            return false;
        }
        return true;
    }

    private CarSearchResult mapToSearchResult(Car car) {
        CarSearchResult result = new CarSearchResult();
        result.setId(car.getId());
        result.setVin(car.getVin());
        result.setLicensePlateNum(car.getLicensePlateNum());
        result.setColor(car.getColor());
        result.setStatus(car.getStatus());
        result.setMileage(car.getMileage());
        result.setFuelType(car.getFuelType());
        result.setTransmissionType(car.getTransmissionType());
        result.setBrand(car.getBrand());
        result.setModel(car.getModel());
        result.setYear(car.getYear());
        result.setCategory(car.getCategory());
        result.setSeatsNumber(car.getSeatsNumber());
        result.setDailyRentalCost(car.getDailyRentalCost());
        result.setOfficeId(car.getOffice() != null ? car.getOffice().getId() : null);
        return result;
    }

    // Admin functionality
    
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }
    
    public List<Car> getCarsByOffice(String officeId) {
        return carRepository.findByOffice_Id(officeId);
    }
    
    public Car addCar(Car car) {
        // Generate a new UUID if not provided
        if (car.getId() == null || car.getId().isEmpty()) {
            car.setId(java.util.UUID.randomUUID().toString());
        }
        
        return carRepository.save(car);
    }
    
    public Car addCar(CarCreateDTO carCreateDTO) {
        Car car = new Car();
        car.setId(java.util.UUID.randomUUID().toString());
        car.setVin(carCreateDTO.getVin());
        car.setLicensePlateNum(carCreateDTO.getLicensePlateNum());
        car.setBrand(carCreateDTO.getBrand());
        car.setModel(carCreateDTO.getModel());
        car.setYear(carCreateDTO.getYear());
        car.setColor(carCreateDTO.getColor());
        car.setStatus(carCreateDTO.getStatus());
        car.setMileage(carCreateDTO.getMileage());
        car.setFuelType(carCreateDTO.getFuelType());
        car.setTransmissionType(carCreateDTO.getTransmissionType());
        car.setCategory(carCreateDTO.getCategory());
        car.setSeatsNumber(carCreateDTO.getSeatsNumber());
        car.setDailyRentalCost(carCreateDTO.getDailyRentalCost());
        
        // Set office if provided
        if (carCreateDTO.getOfficeId() != null && !carCreateDTO.getOfficeId().isEmpty()) {
            Office office = officeRepository.findById(carCreateDTO.getOfficeId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Office not found"));
            car.setOffice(office);
        }
        
        return carRepository.save(car);
    }
}