package db.com.rentalvehicle.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;
import java.util.UUID;
import lombok.Data;

@Entity
@Data
public class Office {

  @Id
  private String id = UUID.randomUUID().toString();

  private String address;
  private String contactNumber;
  private String city;

  @OneToMany(mappedBy = "office")
  private List<Car> cars;
}
