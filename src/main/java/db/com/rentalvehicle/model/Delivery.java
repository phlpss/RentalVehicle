package db.com.rentalvehicle.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Data;

@Entity
@Data
public class Delivery {

  @Id
  private String id = UUID.randomUUID().toString();

  private LocalDate deliveryDate;

  @OneToOne
  @JoinColumn(name = "purchase_id", nullable = false)
  private Purchase purchase;

  @ManyToOne
  @JoinColumn(name = "office_id")
  private Office office;
}
