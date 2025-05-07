package db.com.rentalvehicle.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CompletedInspectionResponse {
    private String inspectionId;
    private String rentalId;
    private LocalDateTime inspectionDate;
    private String carBrand;
    private String model;
    private String licensePlateNum;
    private String clientName;
    private String status;
    private double wearLevelPercentage;
    private double damagePenalty;
    private double cleaningFee;
    private double totalPenalty;
    private String notes;
    private List<DamageReportDto> damageReports;
    
    @Data
    public static class DamageReportDto {
        private String id;
        private String partAffected;
        private String description;
        private double estimatedRepairCost;
    }
} 