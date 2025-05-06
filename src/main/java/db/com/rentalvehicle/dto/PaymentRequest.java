package db.com.rentalvehicle.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PaymentRequest {

  @NotNull
  private String bookingId;
  @NotNull
  private String paymentMethod;
}