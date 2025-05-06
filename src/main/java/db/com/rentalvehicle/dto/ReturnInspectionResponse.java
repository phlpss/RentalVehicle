package db.com.rentalvehicle.dto;

import lombok.Data;

@Data
public class ReturnInspectionResponse {

  private String inspectionId;
  private String status;
  private double totalPenalty;
}