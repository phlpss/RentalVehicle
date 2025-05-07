package db.com.rentalvehicle.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserBookingResponse {
    private String id;
    private LocalDateTime start;
    private LocalDateTime end;
    private String carBrand;
    private String model;
    private String location;
    private String status;
    private InspectionDetailsDto inspectionDetails;
    
    @Data
    public static class InspectionDetailsDto {
        private String inspectionId;
        private double wearLevelPercentage;
        private double damagePenalty;
        private double cleaningFee;
        private double totalPenalty;
        private String notes;
        private String status;
        private List<DamageReportDto> damageReports;
    }
    
    @Data
    public static class DamageReportDto {
        private String id;
        private String partAffected;
        private String description;
        private double estimatedRepairCost;
    }
} 