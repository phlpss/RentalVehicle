package db.com.rentalvehicle.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import lombok.Data;

@Entity
@Data
public class Purchase {
  @Id
  private String id = UUID.randomUUID().toString();

  private LocalDate purchaseDate;

  private double totalPrice;

  private String invoiceNumber;

  @Enumerated(EnumType.STRING)
  private PurchaseStatus status;

  @ManyToOne
  @JoinColumn(name = "supplier_id")
  private Supplier supplier;

  @OneToMany(mappedBy = "purchase", cascade = CascadeType.ALL)
  private List<PurchaseDetails> details;

  @OneToOne(mappedBy = "purchase", cascade = CascadeType.ALL)
  private Delivery delivery;
}
