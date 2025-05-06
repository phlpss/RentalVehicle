package db.com.rentalvehicle.dto;

import lombok.Data;

@Data
public class BookingResponse {

  private String bookingId;
  private String status;
  private double totalCost;
}