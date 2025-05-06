package db.com.rentalvehicle.service.impl;

import db.com.rentalvehicle.dto.ReportFilter;
import db.com.rentalvehicle.dto.ReportResponse;
import db.com.rentalvehicle.service.ReportService;
import java.time.LocalDate;
import org.springframework.stereotype.Service;

@Service
public class ReportServiceImpl implements ReportService {

  @Override
  public ReportResponse getRentalActivityReport(ReportFilter filter) {
    return null;
  }

  @Override
  public ReportResponse getFleetConditionReport(LocalDate asOfDate) {
    return null;
  }

  @Override
  public ReportResponse getFinancialReport(ReportFilter filter) {
    return null;
  }
}
