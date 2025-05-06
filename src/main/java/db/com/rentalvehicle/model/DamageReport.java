package db.com.rentalvehicle.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.UUID;
import lombok.Data;

@Entity
@Data
public class DamageReport {
  @Id
  private String id = UUID.randomUUID().toString();

  private String partAffected;

  @Column(length = 1000)
  private String description;

  private double estimatedRepairCost;

  @ManyToOne
  @JoinColumn(name = "inspection_id")
  private ReturnInspection inspection;
}
