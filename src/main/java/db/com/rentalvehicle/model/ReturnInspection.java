package db.com.rentalvehicle.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.Data;

@Entity
@Data
public class ReturnInspection {

  @Id
  private String id = UUID.randomUUID().toString();

  private LocalDateTime inspectionDate;

  @Enumerated(EnumType.STRING)
  private InspectionStatus status;

  @Column(length = 1000)
  private String notes;

  private double wearLevelPercentage;

  private double damagePenalty;

  private double cleaningFee;

  @OneToOne
  @JoinColumn(name = "rental_id", nullable = false, unique = true)
  private Rental rental;

  @ManyToOne
  @JoinColumn(name = "inspected_by", nullable = false)
  private Worker inspectedBy;

  @OneToMany(mappedBy = "inspection", cascade = CascadeType.ALL)
  private List<DamageReport> damageReports;
}
