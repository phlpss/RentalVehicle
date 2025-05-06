package db.com.rentalvehicle.dto;

import lombok.Data;

@Data
public class PaymentResponse {

  private String paymentId;
  private String status;
  private double amount;
}