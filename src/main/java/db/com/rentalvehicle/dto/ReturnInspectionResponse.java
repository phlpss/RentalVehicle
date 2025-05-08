package db.com.rentalvehicle.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReturnInspectionResponse {
    private String inspectionId;
    private String status;
    private String rentalId;
    private String message;
    private double totalPenalty;
    
    public ReturnInspectionResponse(String inspectionId, String status, String rentalId, String message) {
        this.inspectionId = inspectionId;
        this.status = status;
        this.rentalId = rentalId;
        this.message = message;
    }
    
    public ReturnInspectionResponse(String inspectionId, String status, double totalPenalty) {
        this.inspectionId = inspectionId;
        this.status = status;
        this.totalPenalty = totalPenalty;
    }
}