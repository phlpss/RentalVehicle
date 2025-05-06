package db.com.rentalvehicle.controller;

import db.com.rentalvehicle.dto.BookingRequest;
import db.com.rentalvehicle.dto.BookingResponse;
import db.com.rentalvehicle.dto.ReturnInspectionRequest;
import db.com.rentalvehicle.dto.ReturnInspectionResponse;
import db.com.rentalvehicle.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
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
      description = "Starts an existing booking (changes status from RESERVED to ACTIVE)"
  )
  @PostMapping("/{bookingId}/start")
  public ResponseEntity<Void> startBooking(
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
}