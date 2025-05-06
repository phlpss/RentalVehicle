package db.com.rentalvehicle.service;

import db.com.rentalvehicle.dto.BookingRequest;
import db.com.rentalvehicle.dto.BookingResponse;
import db.com.rentalvehicle.dto.ReturnInspectionRequest;
import db.com.rentalvehicle.dto.ReturnInspectionResponse;

public interface BookingService {

  BookingResponse createBooking(BookingRequest request);

  void startBooking(String bookingId);

  ReturnInspectionResponse finishBooking(String bookingId, ReturnInspectionRequest request);
}