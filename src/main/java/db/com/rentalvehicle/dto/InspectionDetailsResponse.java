package db.com.rentalvehicle.dto;

import lombok.Data;
import java.util.List;

@Data
public class InspectionDetailsResponse {
    private String rentalId;
    private String carBrand;
    private String model;
    private String licensePlateNum;
    private String vin;
    private String clientName;
    private String clientContact;
    private String startDate;
    private String endDate;
    private String status;
    private Double fullPrice;
    
    @Data
    public static class DamageReportDTO {
        private String id;
        private String partAffected;
        private String description;
        private double estimatedRepairCost;
    }
    
    private List<DamageReportDTO> damageReports;
} 