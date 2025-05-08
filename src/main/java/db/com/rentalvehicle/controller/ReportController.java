package db.com.rentalvehicle.controller;

import db.com.rentalvehicle.dto.ReportFilter;
import db.com.rentalvehicle.dto.ReportResponse;
import db.com.rentalvehicle.dto.RevenueReportDTO;
import db.com.rentalvehicle.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Tag(name = "Reports", description = "APIs for generating various reports")
public class ReportController {

    private final ReportService reportService;

    @Operation(
        summary = "Generate revenue report",
        description = "Generates a revenue report with metrics broken down by office and car model for a specified date range"
    )
    @GetMapping("/revenue")
    public ResponseEntity<RevenueReportDTO> getRevenueReport(
        @Parameter(description = "Start date for the report period (inclusive)") 
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
        
        @Parameter(description = "End date for the report period (inclusive)") 
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        RevenueReportDTO report = reportService.generateRevenueReport(startDate, endDate);
        return ResponseEntity.ok(report);
    }
}