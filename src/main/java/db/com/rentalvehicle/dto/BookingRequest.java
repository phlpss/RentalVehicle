package db.com.rentalvehicle.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Data
public class BookingRequest {

  @NotNull
  private String clientId;
  @NotNull
  private String carId;
  @NotNull
  @Future
  private LocalDateTime rentalStart;
  @NotNull
  @Future
  private LocalDateTime rentalEnd;
  private List<String> extraServiceIds;
}