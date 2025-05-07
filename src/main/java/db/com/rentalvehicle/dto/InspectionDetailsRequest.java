package db.com.rentalvehicle.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InspectionDetailsRequest {
    @NotNull
    private String rentalId;
} 