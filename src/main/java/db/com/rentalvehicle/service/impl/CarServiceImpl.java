package db.com.rentalvehicle.service.impl;

import db.com.rentalvehicle.service.CarService;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class CarServiceImpl implements CarService {

  @Override
  public boolean isAvailable(String carId, LocalDateTime start, LocalDateTime end) {
    return false;
  }

  @Override
  public void updateStatus(String carId, String status) {

  }
}
