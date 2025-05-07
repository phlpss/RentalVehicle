package db.com.rentalvehicle.controller;

import db.com.rentalvehicle.dto.BookingRequest;
import db.com.rentalvehicle.dto.BookingResponse;
import db.com.rentalvehicle.dto.ReturnInspectionRequest;
import db.com.rentalvehicle.dto.ReturnInspectionResponse;
import db.com.rentalvehicle.dto.UserBookingResponse;
import db.com.rentalvehicle.dto.WorkerDashboardResponse;
import db.com.rentalvehicle.dto.InspectionDetailsResponse;
import db.com.rentalvehicle.dto.CompletedInspectionResponse;
import db.com.rentalvehicle.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequiredArgsConstructor
@Tag(name = "Booking Management", description = "APIs for managing car bookings")
public class BookingController {

  private final BookingService bookingService;

  @Operation(
      summary = "Create a booking",
      description = "Creates a new booking for a car"
  )
  @PostMapping
  public ResponseEntity<BookingResponse> createBooking(
      @Parameter(description = "Booking details") 
      @Valid @RequestBody BookingRequest bookingRequest
  ) {
    BookingResponse response = bookingService.createBooking(bookingRequest);
    return ResponseEntity.ok(response);
  }

  @Operation(
      summary = "Start a booking",
      description = "Starts an existing booking (changes status from RESERVED to PICKED_UP)"
  )
  @PostMapping("/{bookingId}/pickup")
  public ResponseEntity<Void> pickupBooking(
      @Parameter(description = "ID of the booking to start") 
      @PathVariable String bookingId
  ) {
    bookingService.startBooking(bookingId);
    return ResponseEntity.noContent().build();
  }

  /**
   * Complete booking and record return inspection.
   */
  @PostMapping("/{bookingId}/finish")
  public ResponseEntity<ReturnInspectionResponse> finishBooking(
      @PathVariable String bookingId,
      @Valid @RequestBody ReturnInspectionRequest request
  ) {
    ReturnInspectionResponse resp = bookingService.finishBooking(bookingId, request);
    return ResponseEntity.ok(resp);
  }

  @GetMapping("/user/{userId}")
  @Operation(
      summary = "Get user bookings",
      description = "Retrieves all bookings for a specific user"
  )
  public ResponseEntity<List<UserBookingResponse>> getUserBookings(
      @Parameter(description = "ID of the user") 
      @PathVariable String userId
  ) {
      List<UserBookingResponse> bookings = bookingService.getUserBookings(userId);
      return ResponseEntity.ok(bookings);
  }

  @GetMapping("/worker/{workerId}/dashboard")
  @Operation(
      summary = "Get worker dashboard data",
      description = "Retrieves pending inspections and active rentals for a worker"
  )
  public ResponseEntity<WorkerDashboardResponse> getWorkerDashboard(
      @Parameter(description = "ID of the worker") 
      @PathVariable String workerId
  ) {
      WorkerDashboardResponse response = bookingService.getWorkerDashboard(workerId);
      return ResponseEntity.ok(response);
  }

  @GetMapping("/inspection/{rentalId}")
  @Operation(
      summary = "Get inspection details",
      description = "Retrieves details needed for the car inspection"
  )
  public ResponseEntity<InspectionDetailsResponse> getInspectionDetails(
      @Parameter(description = "ID of the rental") 
      @PathVariable String rentalId
  ) {
      InspectionDetailsResponse response = bookingService.getInspectionDetails(rentalId);
      return ResponseEntity.ok(response);
  }

  @PostMapping("/inspection/{rentalId}/submit")
  @Operation(
      summary = "Submit inspection",
      description = "Submit the inspection results for a rental"
  )
  public ResponseEntity<ReturnInspectionResponse> submitInspection(
      @Parameter(description = "ID of the rental") 
      @PathVariable String rentalId,
      @Valid @RequestBody ReturnInspectionRequest request
  ) {
      ReturnInspectionResponse response = bookingService.finishBooking(rentalId, request);
      return ResponseEntity.ok(response);
  }

  @GetMapping("/worker/{workerId}/completed-inspections")
  @Operation(
      summary = "Get completed inspections",
      description = "Retrieves all completed inspections performed by the worker"
  )
  public ResponseEntity<List<CompletedInspectionResponse>> getCompletedInspections(
      @Parameter(description = "ID of the worker") 
      @PathVariable String workerId
  ) {
      List<CompletedInspectionResponse> response = bookingService.getCompletedInspections(workerId);
      return ResponseEntity.ok(response);
  }

  /**
   * Mark booking as returned.
   */
  @PostMapping("/{bookingId}/return")
  public ResponseEntity<Void> returnBooking(
      @PathVariable String bookingId
  ) {
    bookingService.returnBooking(bookingId);
    return ResponseEntity.noContent().build();
  }
}