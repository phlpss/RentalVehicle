package db.com.rentalvehicle.model;

import db.com.rentalvehicle.anotation.ContactNumberConstraint;
import db.com.rentalvehicle.anotation.DriverLicenseNumberConstraint;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class Client {

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

  private double rating;

  private String address;

  @DriverLicenseNumberConstraint
  @NotEmpty(message = "Driver license number cannot be empty")
  private String driverLicenseNumber;

  @OneToMany(mappedBy = "client")
  private List<Rental> rentals;
}
