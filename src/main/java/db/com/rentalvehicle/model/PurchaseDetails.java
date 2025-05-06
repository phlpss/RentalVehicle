package db.com.rentalvehicle.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.UUID;
import lombok.Data;

@Entity
@Data
public class PurchaseDetails {
  @Id
  private String id = UUID.randomUUID().toString();

  private int amount;

  private double price;

  @ManyToOne
  @JoinColumn(name = "purchase_id")
  private Purchase purchase;
}

