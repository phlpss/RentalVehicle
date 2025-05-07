package db.com.rentalvehicle.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DamageReportDTO {
    private String id;
    private String partAffected;
    private String description;
    private Double estimatedRepairCost;
    private String inspectionId;
} 