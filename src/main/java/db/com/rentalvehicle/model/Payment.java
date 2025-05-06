package db.com.rentalvehicle.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
public class Payment {
  @Id
  private String id = UUID.randomUUID().toString();

  private LocalDate paymentDate;
  private double fine;
  private double total;

  @Enumerated(EnumType.STRING)
  private PaymentType paymentType;
}
