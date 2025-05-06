package db.com.rentalvehicle.service;

import db.com.rentalvehicle.dto.PaymentRequest;
import db.com.rentalvehicle.dto.PaymentResponse;

public interface PaymentService {

  PaymentResponse processPayment(PaymentRequest request);
}