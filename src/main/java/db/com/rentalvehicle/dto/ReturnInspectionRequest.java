package db.com.rentalvehicle.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.Data;

@Data
public class ReturnInspectionRequest {

  @NotNull
  private String workerId;
  private double wearLevelPercentage;
  private double damagePenalty;
  private double cleaningFee;
  private List<String> damageReportIds;
}