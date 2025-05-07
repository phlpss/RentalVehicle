package db.com.rentalvehicle.dto;

import lombok.Data;
import java.util.List;

@Data
public class WorkerDashboardResponse {
    private List<RentalInspectionDTO> pendingInspections;
    private List<ActiveRentalDTO> activeRentals;
    private int totalPendingInspections;
    private int totalActiveRentals;

    @Data
    public static class RentalInspectionDTO {
        private String rentalId;
        private String carBrand;
        private String model;
        private String licensePlateNum;
        private String clientName;
        private String clientContact;
        private String status;
        private String inspectionType; // PICKUP or RETURN
    }

    @Data
    public static class ActiveRentalDTO {
        private String rentalId;
        private String carBrand;
        private String model;
        private String licensePlateNum;
        private String clientName;
        private String clientContact;
        private String startDate;
        private String endDate;
        private String status;
    }
}
