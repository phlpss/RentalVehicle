package db.com.rentalvehicle.model;

import db.com.rentalvehicle.anotation.ContactNumberConstraint;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import java.util.List;
import java.util.UUID;
import lombok.Data;

@Entity
@Data
public class Supplier {
  @Id
  private String id = UUID.randomUUID().toString();

  private String fullName;

  @Email
  private String email;

  @ContactNumberConstraint
  private String contactNumber;

  private String address;

  @OneToMany(mappedBy = "supplier")
  private List<Purchase> purchases;
}
