package db.com.rentalvehicle.service.impl;

import db.com.rentalvehicle.dto.BookingRequest;
import db.com.rentalvehicle.dto.BookingResponse;
import db.com.rentalvehicle.dto.ReturnInspectionRequest;
import db.com.rentalvehicle.dto.ReturnInspectionResponse;
import db.com.rentalvehicle.service.BookingService;
import org.springframework.stereotype.Service;

@Service
public class BookingServiceImpl implements BookingService {

  @Override
  public BookingResponse createBooking(BookingRequest request) {
    return null;
  }

  @Override
  public void startBooking(String bookingId) {

  }

  @Override
  public ReturnInspectionResponse finishBooking(String bookingId, ReturnInspectionRequest request) {
    return null;
  }
}
