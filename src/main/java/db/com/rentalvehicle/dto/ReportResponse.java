package db.com.rentalvehicle.dto;

import lombok.Data;

@Data
public class ReportResponse {

  private Object data;   // can be List<SomeReportRow> or custom structure
  private String message;
}