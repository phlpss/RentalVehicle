package db.com.rentalvehicle.dto;

import lombok.Data;

@Data
public class CarSearchParameters {
    private String model;
    private String category;
    private String transmissionType;
    private String fuelType;
    private Integer year;
    private String city;
} 