package db.com.rentalvehicle.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvailableDatesResponse {
    private String carId;
    private List<LocalDate> availableDates;
    private LocalDate earliestAvailableDate;
    private LocalDate latestAvailableDate;
} 