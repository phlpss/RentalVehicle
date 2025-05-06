package db.com.rentalvehicle.service;

import db.com.rentalvehicle.dto.ReportFilter;
import db.com.rentalvehicle.dto.ReportResponse;
import java.time.LocalDate;

public interface ReportService {

  ReportResponse getRentalActivityReport(ReportFilter filter);

  ReportResponse getFleetConditionReport(LocalDate asOfDate);

  ReportResponse getFinancialReport(ReportFilter filter);
}
