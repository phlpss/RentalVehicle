package db.com.rentalvehicle.service.impl;

import db.com.rentalvehicle.dto.BookingRequest;
import db.com.rentalvehicle.dto.BookingResponse;
import db.com.rentalvehicle.dto.ReturnInspectionRequest;
import db.com.rentalvehicle.dto.ReturnInspectionResponse;
import db.com.rentalvehicle.model.Car;
import db.com.rentalvehicle.model.Client;
import db.com.rentalvehicle.model.Rental;
import db.com.rentalvehicle.model.RentalStatus;
import db.com.rentalvehicle.repository.CarRepository;
import db.com.rentalvehicle.repository.ClientRepository;
import db.com.rentalvehicle.repository.RentalRepository;
import db.com.rentalvehicle.service.BookingService;
import db.com.rentalvehicle.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

  private final RentalRepository rentalRepository;
  private final CarRepository carRepository;
  private final ClientRepository clientRepository;
  private final CarService carService;

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
    
    rental.setStatus(RentalStatus.ACTIVE);
    rentalRepository.save(rental);
    
    // Update car status
    carService.updateStatus(rental.getCar().getId(), "RENTED");
  }

  @Override
  public ReturnInspectionResponse finishBooking(String bookingId, ReturnInspectionRequest request) {
    // This will be implemented later
    return null;
  }
}
