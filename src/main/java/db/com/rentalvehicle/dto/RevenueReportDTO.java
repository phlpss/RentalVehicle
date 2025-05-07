package db.com.rentalvehicle.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RevenueReportDTO {
    // Report criteria
    private LocalDate startDate;
    private LocalDate endDate;
    
    // Summary metrics
    private Double totalRevenue;
    private Integer totalDaysRented;
    private Double avgDaysPerCar;
    
    // Grouped details
    private List<RevenueByOfficeDTO> revenueByOffice;
    private List<RevenueByModelDTO> revenueByModel;
}

