package db.com.rentalvehicle.service.impl;

import db.com.rentalvehicle.dto.PaymentRequest;
import db.com.rentalvehicle.dto.PaymentResponse;
import db.com.rentalvehicle.service.PaymentService;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

  @Override
  public PaymentResponse processPayment(PaymentRequest request) {
    return null;
  }
}
