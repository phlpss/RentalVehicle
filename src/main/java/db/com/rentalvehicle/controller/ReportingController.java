package db.com.rentalvehicle.controller;

import db.com.rentalvehicle.dto.ReportFilter;
import db.com.rentalvehicle.dto.ReportResponse;
import db.com.rentalvehicle.service.ReportService;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportingController {

  private final ReportService reportService;

  /**
   * Rental activity report.
   */
  @GetMapping("/rentals")
  public ResponseEntity<ReportResponse> rentalReport(
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
      @RequestParam(required = false) String carCategory
  ) {
    ReportFilter filter = new ReportFilter(from, to, carCategory);
    return ResponseEntity.ok(reportService.getRentalActivityReport(filter));
  }

  /**
   * Fleet condition report.
   */
  @GetMapping("/fleet")
  public ResponseEntity<ReportResponse> fleetReport(
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate asOf
  ) {
    return ResponseEntity.ok(reportService.getFleetConditionReport(asOf));
  }

  /**
   * Financial performance report.
   */
  @GetMapping("/financial")
  public ResponseEntity<ReportResponse> financialReport(
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
  ) {
    ReportFilter filter = new ReportFilter(from, to, null);
    return ResponseEntity.ok(reportService.getFinancialReport(filter));
  }
}
