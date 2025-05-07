package db.com.rentalvehicle.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarCreateDTO {
    private String vin;
    private String licensePlateNum;
    private String brand;
    private String model;
    private Integer year;
    private String color;
    private String status;
    private String mileage;
    private String fuelType;
    private String transmissionType;
    private String category;
    private Integer seatsNumber;
    private Double dailyRentalCost;
    private String officeId;
} 