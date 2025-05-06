package db.com.rentalvehicle.model;

import db.com.rentalvehicle.anotation.ContactNumberConstraint;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import java.util.UUID;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
public class Worker {

  @Id
  private String id = UUID.randomUUID().toString();

  @NotEmpty
  private String fullName;

  @Column(unique = true)
  @ContactNumberConstraint
  @NotEmpty(message = "Contact number cannot be empty")
  private String contactNumber;

  @Column(unique = true)
  @Email(message = "Email is not valid", regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
  private String email;

  @Column
  private String address;

  @Enumerated(EnumType.STRING)
  private Position position;

  @OneToMany(mappedBy = "worker")
  private List<Rental> rentals;
}
