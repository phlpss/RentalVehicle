package db.com.rentalvehicle.controller;

import db.com.rentalvehicle.dto.AvailabilityResponse;
import db.com.rentalvehicle.dto.AvailableDatesResponse;
import db.com.rentalvehicle.dto.CarCreateDTO;
import db.com.rentalvehicle.dto.CarDTO;
import db.com.rentalvehicle.dto.CarSearchParameters;
import db.com.rentalvehicle.dto.CarSearchResult;
import db.com.rentalvehicle.dto.CarSearchSelectors;
import db.com.rentalvehicle.mapper.EntityMapper;
import db.com.rentalvehicle.model.Car;
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
  private final EntityMapper entityMapper;

  @Operation(
      summary = "Get car details by ID",
      description = "Retrieves the details of a specific car by its ID"
  )
  @GetMapping("/{carId}")
  public ResponseEntity<CarSearchResult> getCarDetails(
      @Parameter(description = "ID of the car to retrieve") @PathVariable String carId
  ) {
    CarSearchResult carDetails = carService.getCarDetails(carId);
    return ResponseEntity.ok(carDetails);
  }

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
      summary = "Get available booking dates",
      description = "Returns a list of available dates for booking the specified car"
  )
  @GetMapping("/{carId}/available-dates")
  public ResponseEntity<AvailableDatesResponse> getAvailableDates(
      @Parameter(description = "ID of the car to check") @PathVariable String carId
  ) {
    AvailableDatesResponse response = carService.getAvailableDates(carId);
    return ResponseEntity.ok(response);
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

  @Operation(
      summary = "Get all cars",
      description = "Retrieves all cars in the system"
  )
  @GetMapping
  public ResponseEntity<List<CarDTO>> getAllCars() {
    List<Car> cars = carService.getAllCars();
    return ResponseEntity.ok(entityMapper.toCarDTOList(cars));
  }

  @Operation(
      summary = "Get cars by office",
      description = "Retrieves all cars located at a specific office"
  )
  @GetMapping("/office/{officeId}")
  public ResponseEntity<List<CarDTO>> getCarsByOffice(
      @Parameter(description = "ID of the office") @PathVariable String officeId
  ) {
    List<Car> cars = carService.getCarsByOffice(officeId);
    return ResponseEntity.ok(entityMapper.toCarDTOList(cars));
  }

  @Operation(
      summary = "Add a new car",
      description = "Adds a new car to the system"
  )
  @PostMapping
  public ResponseEntity<CarDTO> addCar(
      @Parameter(description = "Car details") @RequestBody CarCreateDTO carCreateDTO
  ) {
    Car savedCar = carService.addCar(carCreateDTO);
    return ResponseEntity.ok(entityMapper.toCarDTO(savedCar));
  }
}
