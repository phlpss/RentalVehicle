package db.com.rentalvehicle.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserBookingResponse {
    private String id;
    private LocalDateTime start;
    private LocalDateTime end;
    private String carBrand;
    private String model;
    private String location;
} 