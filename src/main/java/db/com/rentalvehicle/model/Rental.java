package db.com.rentalvehicle.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;
import lombok.Data;

@Entity
@Data
public class Rental {
  @Id
  private String id = UUID.randomUUID().toString();

  private LocalDateTime rentalDate;
  private LocalDateTime rentalStart;
  private LocalDateTime rentalEnd;

  @Enumerated(EnumType.STRING)
  private RentalStatus status;

  private double fullPrice;

  @ManyToOne
  @JoinColumn(name = "client_id")
  private Client client;

  @ManyToOne
  @JoinColumn(name = "worker_id")
  private Worker worker;

  @ManyToOne
  @JoinColumn(name = "car_id")
  private Car car;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "payment_id")
  private Payment payment;
}