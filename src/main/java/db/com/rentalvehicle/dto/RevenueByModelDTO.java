package db.com.rentalvehicle.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RevenueByModelDTO {
    private String brand;
    private String model;
    private Double revenue;
    private Integer daysRented;
    private Integer carsRented;
    private Double avgDaysPerCar;
} 