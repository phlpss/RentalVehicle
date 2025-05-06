package db.com.rentalvehicle.service;

import java.time.LocalDateTime;

public interface CarService {

  boolean isAvailable(String carId, LocalDateTime start, LocalDateTime end);

  void updateStatus(String carId, String status);
}