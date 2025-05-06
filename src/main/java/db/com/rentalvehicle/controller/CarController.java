package db.com.rentalvehicle.controller;

import db.com.rentalvehicle.dto.AvailabilityResponse;
import db.com.rentalvehicle.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarController {

  private final CarService carService;

  /**
   * Check if a car is available for the given period.
   */
  @GetMapping("/{carId}/availability")
  public ResponseEntity<AvailabilityResponse> checkAvailability(
      @PathVariable String carId,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end
  ) {
    boolean available = carService.isAvailable(carId, start, end);
    return ResponseEntity.ok(new AvailabilityResponse(carId, available));
  }
}
