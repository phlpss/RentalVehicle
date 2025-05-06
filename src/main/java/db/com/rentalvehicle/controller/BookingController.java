package db.com.rentalvehicle.controller;

import db.com.rentalvehicle.dto.BookingRequest;
import db.com.rentalvehicle.dto.BookingResponse;
import db.com.rentalvehicle.dto.ReturnInspectionRequest;
import db.com.rentalvehicle.dto.ReturnInspectionResponse;
import db.com.rentalvehicle.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@Validated
public class BookingController {

  private final BookingService bookingService;

  /**
   * Create a new booking.
   */
  @PostMapping
  public ResponseEntity<BookingResponse> createBooking(
      @Valid @RequestBody BookingRequest request
  ) {
    BookingResponse response = bookingService.createBooking(request);
    return ResponseEntity.status(201).body(response);
  }

  /**
   * Mark booking as started.
   */
  @PostMapping("/{bookingId}/start")
  public ResponseEntity<Void> startBooking(@PathVariable String bookingId) {
    bookingService.startBooking(bookingId);
    return ResponseEntity.ok().build();
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