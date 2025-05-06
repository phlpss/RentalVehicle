package db.com.rentalvehicle.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import db.com.rentalvehicle.dto.CarSearchParameters;
import db.com.rentalvehicle.dto.CarSearchResult;
import db.com.rentalvehicle.dto.CarSearchSelectors;
import db.com.rentalvehicle.model.Car;
import db.com.rentalvehicle.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CarService {
    private final CarRepository carRepository;

    boolean isAvailable(String carId, LocalDateTime start, LocalDateTime end) {
        // Implementation needed
        return false;
    }

    void updateStatus(String carId, String status) {
        // Implementation needed
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

    public List<CarSearchResult> searchCars(CarSearchParameters parameters) {
        return carRepository.findAll().stream()
                .filter(car -> matchesSearchParameters(car, parameters))
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
}