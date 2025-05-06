package db.com.rentalvehicle.controller;

import db.com.rentalvehicle.dto.PaymentRequest;
import db.com.rentalvehicle.dto.PaymentResponse;
import db.com.rentalvehicle.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Validated
public class PaymentController {

  private final PaymentService paymentService;

  /**
   * Calculate and process payment for a booking.
   */
  @PostMapping
  public ResponseEntity<PaymentResponse> processPayment(
      @Valid @RequestBody PaymentRequest request
  ) {
    PaymentResponse resp = paymentService.processPayment(request);
    return ResponseEntity.status(201).body(resp);
  }
}