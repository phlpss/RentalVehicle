package db.com.rentalvehicle.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReportFilter {

  private LocalDate from;
  private LocalDate to;
  private String category;
}