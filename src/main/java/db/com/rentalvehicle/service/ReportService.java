package db.com.rentalvehicle.service;

import db.com.rentalvehicle.dto.ReportFilter;
import db.com.rentalvehicle.dto.ReportResponse;
import db.com.rentalvehicle.dto.RevenueByModelDTO;
import db.com.rentalvehicle.dto.RevenueByOfficeDTO;
import db.com.rentalvehicle.dto.RevenueReportDTO;
import db.com.rentalvehicle.model.Car;
import db.com.rentalvehicle.model.Office;
import db.com.rentalvehicle.model.Rental;
import db.com.rentalvehicle.repository.CarRepository;
import db.com.rentalvehicle.repository.OfficeRepository;
import db.com.rentalvehicle.repository.RentalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final RentalRepository rentalRepository;
    private final CarRepository carRepository;
    private final OfficeRepository officeRepository;
    
    /**
     * Generate a revenue report for a specific date range
     */
    public RevenueReportDTO generateRevenueReport(LocalDate startDate, LocalDate endDate) {
        // Convert dates to LocalDateTime for querying
        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.plusDays(1).atStartOfDay().minusNanos(1);
        
        // Find all completed rentals within the date range
        List<Rental> completedRentals = rentalRepository.findCompletedRentalsInDateRange(start, end);
        
        // Calculate summary metrics
        double totalRevenue = 0;
        int totalDaysRented = 0;
        
        // Maps for grouping by office and model
        Map<String, RevenueByOfficeDTO> officeMap = new HashMap<>();
        Map<String, RevenueByModelDTO> modelMap = new HashMap<>();
        
        // Process each rental
        for (Rental rental : completedRentals) {
            Car car = rental.getCar();
            if (car == null) continue;
            
            // Calculate days rented and revenue for this rental
            long daysRented = ChronoUnit.DAYS.between(rental.getRentalStart().toLocalDate(), 
                                                      rental.getRentalEnd().toLocalDate()) + 1;
            double rentalRevenue = daysRented * car.getDailyRentalCost();
            
            // Add to summary metrics
            totalRevenue += rentalRevenue;
            totalDaysRented += daysRented;
            
            // Add to office grouping
            Office office = car.getOffice();
            if (office != null) {
                String officeId = office.getId();
                RevenueByOfficeDTO officeDTO = officeMap.getOrDefault(officeId, new RevenueByOfficeDTO(
                    officeId, office.getCity(), office.getAddress(), 0.0, 0, 0, 0.0
                ));
                
                officeDTO.setRevenue(officeDTO.getRevenue() + rentalRevenue);
                officeDTO.setDaysRented(officeDTO.getDaysRented() + (int)daysRented);
                officeDTO.setCarsRented(officeDTO.getCarsRented() + 1);
                
                officeMap.put(officeId, officeDTO);
            }
            
            // Add to model grouping
            String modelKey = car.getBrand() + "-" + car.getModel();
            RevenueByModelDTO modelDTO = modelMap.getOrDefault(modelKey, new RevenueByModelDTO(
                car.getBrand(), car.getModel(), 0.0, 0, 0, 0.0
            ));
            
            modelDTO.setRevenue(modelDTO.getRevenue() + rentalRevenue);
            modelDTO.setDaysRented(modelDTO.getDaysRented() + (int)daysRented);
            modelDTO.setCarsRented(modelDTO.getCarsRented() + 1);
            
            modelMap.put(modelKey, modelDTO);
        }
        
        // Calculate average days per car
        double avgDaysPerCar = completedRentals.isEmpty() ? 0 : 
            (double) totalDaysRented / completedRentals.size();
        
        // Calculate average days per car for each office
        for (RevenueByOfficeDTO officeDTO : officeMap.values()) {
            if (officeDTO.getCarsRented() > 0) {
                officeDTO.setAvgDaysPerCar((double) officeDTO.getDaysRented() / officeDTO.getCarsRented());
            }
        }
        
        // Calculate average days per car for each model
        for (RevenueByModelDTO modelDTO : modelMap.values()) {
            if (modelDTO.getCarsRented() > 0) {
                modelDTO.setAvgDaysPerCar((double) modelDTO.getDaysRented() / modelDTO.getCarsRented());
            }
        }
        
        // Create and return the final report
        RevenueReportDTO reportDTO = new RevenueReportDTO();
        reportDTO.setStartDate(startDate);
        reportDTO.setEndDate(endDate);
        reportDTO.setTotalRevenue(totalRevenue);
        reportDTO.setTotalDaysRented(totalDaysRented);
        reportDTO.setAvgDaysPerCar(avgDaysPerCar);
        reportDTO.setRevenueByOffice(new ArrayList<>(officeMap.values()));
        reportDTO.setRevenueByModel(new ArrayList<>(modelMap.values()));
        
        return reportDTO;
    }

    public ReportResponse getRentalActivityReport(ReportFilter filter) {
        // Placeholder implementation
        ReportResponse response = new ReportResponse();
        response.setSuccess(true);
        response.setMessage("Rental activity report generated successfully");
        // In a real implementation, we would calculate and return rental activity data
        return response;
    }

    public ReportResponse getFleetConditionReport(LocalDate asOfDate) {
        // Placeholder implementation
        ReportResponse response = new ReportResponse();
        response.setSuccess(true);
        response.setMessage("Fleet condition report generated successfully");
        // In a real implementation, we would calculate and return fleet condition data
        return response;
    }

    public ReportResponse getFinancialReport(ReportFilter filter) {
        // Placeholder implementation
        ReportResponse response = new ReportResponse();
        response.setSuccess(true);
        response.setMessage("Financial report generated successfully");
        // In a real implementation, we would calculate and return financial data
        return response;
    }
}