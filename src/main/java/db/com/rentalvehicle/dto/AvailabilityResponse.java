package db.com.rentalvehicle.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AvailabilityResponse {

  private String carId;
  private boolean available;
}