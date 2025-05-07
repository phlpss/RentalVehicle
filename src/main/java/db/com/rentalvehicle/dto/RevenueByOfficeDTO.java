package db.com.rentalvehicle.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RevenueByOfficeDTO {
    private String officeId;
    private String officeCity;
    private String officeAddress;
    private Double revenue;
    private Integer daysRented;
    private Integer carsRented;
    private Double avgDaysPerCar;
} 