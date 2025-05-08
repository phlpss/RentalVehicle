package db.com.rentalvehicle.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReturnInspectionRequest {

  @NotNull
  private String workerId;
  private double wearLevelPercentage;
  private double damagePenalty;
  private double cleaningFee;
  private String notes;
  private String status; // OK, NEEDS_REPAIR, FINED
  private List<DamageReportDto> damageReports;
  
  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class DamageReportDto {
    private String partAffected;
    private String description;
    private Double estimatedRepairCost;
  }
}