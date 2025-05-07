package db.com.rentalvehicle.service.impl;

import db.com.rentalvehicle.dto.*;
import db.com.rentalvehicle.model.*;
import db.com.rentalvehicle.repository.CarRepository;
import db.com.rentalvehicle.repository.ClientRepository;
import db.com.rentalvehicle.repository.RentalRepository;
import db.com.rentalvehicle.repository.WorkerRepository;
import db.com.rentalvehicle.service.BookingService;
import db.com.rentalvehicle.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final RentalRepository rentalRepository;
    private final CarRepository carRepository;
    private final ClientRepository clientRepository;
    private final CarService carService;
    private final WorkerRepository workerRepository;

    @Override
    @Transactional
    public BookingResponse createBooking(BookingRequest request) {
        // Validate car exists
        Car car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));

        // Validate client exists
        Client client = clientRepository.findById(request.getClientId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Client not found"));

        // Check if car is available for this period
        boolean isAvailable = carService.isAvailable(
                request.getCarId(),
                request.getRentalStart(),
                request.getRentalEnd()
        );

        if (!isAvailable) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Car is not available for the selected period"
            );
        }

        // Create the rental
        Rental rental = new Rental();
        rental.setCar(car);
        rental.setClient(client);
        rental.setRentalDate(LocalDateTime.now());
        rental.setRentalStart(request.getRentalStart());
        rental.setRentalEnd(request.getRentalEnd());
        rental.setStatus(RentalStatus.RESERVED);

        // Calculate price
        long days = ChronoUnit.DAYS.between(request.getRentalStart(), request.getRentalEnd()) + 1;
        double totalPrice = days * car.getDailyRentalCost();
        rental.setFullPrice(totalPrice);

        // Save the rental
        rental = rentalRepository.save(rental);

        // Prepare response
        BookingResponse response = new BookingResponse();
        response.setBookingId(rental.getId());
        response.setStatus(rental.getStatus().name());
        response.setTotalCost(totalPrice);

        return response;
    }

    @Override
    public void startBooking(String bookingId) {
        Rental rental = rentalRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        if (rental.getStatus() != RentalStatus.RESERVED) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Booking can only be started from RESERVED status"
            );
        }

        rental.setStatus(RentalStatus.PICKED_UP);
        rentalRepository.save(rental);

        // Update car status
        carService.updateStatus(rental.getCar().getId(), "RENTED");
    }

    @Override
    public ReturnInspectionResponse finishBooking(String bookingId, ReturnInspectionRequest request) {
        // This will be implemented later
        return null;
    }

    @Override
    public List<UserBookingResponse> getUserBookings(String userId) {
        Client client = clientRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return client.getRentals().stream()
                .map(rental -> {
                    UserBookingResponse response = new UserBookingResponse();
                    response.setId(rental.getId());
                    response.setStart(rental.getRentalStart());
                    response.setEnd(rental.getRentalEnd());
                    response.setCarBrand(rental.getCar().getBrand());
                    response.setModel(rental.getCar().getModel());
                    response.setLocation(rental.getCar().getOffice().getAddress());
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    public WorkerDashboardResponse getWorkerDashboard(String workerId) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Worker not found"));

        // Get pending inspections (only return inspections now - RETURNED status)
        List<WorkerDashboardResponse.RentalInspectionDTO> pendingInspections = rentalRepository.findByStatusAndWorkerId(
                        RentalStatus.RETURNED,
                        workerId
                ).stream()
                .map(rental -> {
                    WorkerDashboardResponse.RentalInspectionDTO dto = new WorkerDashboardResponse.RentalInspectionDTO();
                    dto.setRentalId(rental.getId());
                    dto.setCarBrand(rental.getCar().getBrand());
                    dto.setModel(rental.getCar().getModel());
                    dto.setLicensePlateNum(rental.getCar().getLicensePlateNum());
                    dto.setClientName(rental.getClient().getFullName());
                    dto.setClientContact(rental.getClient().getContactNumber());
                    dto.setStatus(rental.getStatus().name());
                    dto.setInspectionType("RETURN"); // Only return inspections
                    return dto;
                })
                .collect(Collectors.toList());

        // Get active rentals
        List<WorkerDashboardResponse.ActiveRentalDTO> activeRentals = rentalRepository.findByStatusInAndWorkerId(
                        List.of(RentalStatus.RESERVED, RentalStatus.PICKED_UP),
                        workerId
                ).stream()
                .map(rental -> {
                    WorkerDashboardResponse.ActiveRentalDTO dto = new WorkerDashboardResponse.ActiveRentalDTO();
                    dto.setRentalId(rental.getId());
                    dto.setCarBrand(rental.getCar().getBrand());
                    dto.setModel(rental.getCar().getModel());
                    dto.setLicensePlateNum(rental.getCar().getLicensePlateNum());
                    dto.setClientName(rental.getClient().getFullName());
                    dto.setClientContact(rental.getClient().getContactNumber());
                    dto.setStartDate(rental.getRentalStart().toString());
                    dto.setEndDate(rental.getRentalEnd().toString());
                    dto.setStatus(rental.getStatus().name());
                    return dto;
                })
                .collect(Collectors.toList());

        WorkerDashboardResponse response = new WorkerDashboardResponse();
        response.setPendingInspections(pendingInspections);
        response.setActiveRentals(activeRentals);
        response.setTotalPendingInspections(pendingInspections.size());
        response.setTotalActiveRentals(activeRentals.size());

        return response;
    }
}
