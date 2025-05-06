package db.com.rentalvehicle.dto;

import lombok.Data;

@Data
public class CarSearchResult {
    private String id;
    private String vin;
    private String licensePlateNum;
    private String color;
    private String status;
    private String mileage;
    private String fuelType;
    private String transmissionType;
    private String brand;
    private String model;
    private Integer year;
    private String category;
    private Integer seatsNumber;
    private Double dailyRentalCost;
    private String officeId;
} 