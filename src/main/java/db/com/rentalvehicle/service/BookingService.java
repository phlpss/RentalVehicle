package db.com.rentalvehicle.service;

import db.com.rentalvehicle.dto.*;

import java.util.List;

public interface BookingService {

  BookingResponse createBooking(BookingRequest request);

  void startBooking(String bookingId);

  void returnBooking(String bookingId);

  ReturnInspectionResponse finishBooking(String bookingId, ReturnInspectionRequest request);

  List<UserBookingResponse> getUserBookings(String userId);

  WorkerDashboardResponse getWorkerDashboard(String workerId);

  InspectionDetailsResponse getInspectionDetails(String rentalId);

  List<CompletedInspectionResponse> getCompletedInspections(String workerId);
}