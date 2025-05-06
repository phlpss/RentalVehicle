package db.com.rentalvehicle.controller;

import db.com.rentalvehicle.dto.AvailabilityResponse;
import db.com.rentalvehicle.dto.CarSearchParameters;
import db.com.rentalvehicle.dto.CarSearchResult;
import db.com.rentalvehicle.dto.CarSearchSelectors;
import db.com.rentalvehicle.service.CarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
@Tag(name = "Car Management", description = "APIs for managing cars and car-related operations")
public class CarController {

  private final CarService carService;

  @Operation(
      summary = "Check car availability",
      description = "Checks if a car is available for the specified time period"
  )
  @GetMapping("/{carId}/availability")
  public ResponseEntity<AvailabilityResponse> checkAvailability(
      @Parameter(description = "ID of the car to check") @PathVariable String carId,
      @Parameter(description = "Start date and time of the rental period") 
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
      @Parameter(description = "End date and time of the rental period") 
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end
  ) {
    boolean available = carService.isAvailable(carId, start, end);
    return ResponseEntity.ok(new AvailabilityResponse(carId, available));
  }

  @Operation(
      summary = "Get car search selectors",
      description = "Retrieves available options for car search parameters"
  )
  @GetMapping("/search/selectors")
  public ResponseEntity<CarSearchSelectors> getSearchSelectors() {
    return ResponseEntity.ok(carService.getSearchSelectors());
  }

  @Operation(
      summary = "Search cars",
      description = "Searches for cars based on the provided search parameters"
  )
  @PostMapping("/search")
  public ResponseEntity<List<CarSearchResult>> searchCars(
      @Parameter(description = "Search parameters for filtering cars") 
      @RequestBody CarSearchParameters searchParameters
  ) {
    return ResponseEntity.ok(carService.searchCars(searchParameters));
  }
}
