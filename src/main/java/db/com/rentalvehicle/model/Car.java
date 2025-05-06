package db.com.rentalvehicle.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.List;
import java.util.UUID;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
public class Car {
  @Id
  private String id = UUID.randomUUID().toString();

  private String vin;
  private String licensePlateNum;
  private String color;
  private String status;
  private String mileage;
  private String fuelType;
  private String transmissionType;
  private String brand;
  private String model;
  private int year;
  private String category;
  private int seatsNumber;
  private double dailyRentalCost;

  @ManyToOne
  @JoinColumn(name = "office_id")
  private Office office;

  @OneToMany(mappedBy = "car")
  private List<Rental> rentals;
}
