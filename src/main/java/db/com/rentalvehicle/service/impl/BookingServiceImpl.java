package db.com.rentalvehicle.service.impl;

import db.com.rentalvehicle.dto.*;
import db.com.rentalvehicle.model.*;
import db.com.rentalvehicle.repository.CarRepository;
import db.com.rentalvehicle.repository.ClientRepository;
import db.com.rentalvehicle.repository.RentalRepository;
import db.com.rentalvehicle.repository.ReturnInspectionRepository;
import db.com.rentalvehicle.repository.WorkerRepository;
import db.com.rentalvehicle.service.BookingService;
import db.com.rentalvehicle.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final RentalRepository rentalRepository;
    private final CarRepository carRepository;
    private final ClientRepository clientRepository;
    private final CarService carService;
    private final WorkerRepository workerRepository;
    private final ReturnInspectionRepository returnInspectionRepository;

    @Override
    @Transactional
    public BookingResponse createBooking(BookingRequest request) {
        // Validate car exists
        Car car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));

        // Validate client exists
        Client client = clientRepository.findById(request.getClientId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Client not found"));

        // Check if car is available for this period
        boolean isAvailable = carService.isAvailable(
                request.getCarId(),
                request.getRentalStart(),
                request.getRentalEnd()
        );

        if (!isAvailable) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Car is not available for the selected period"
            );
        }

        // Create the rental
        Rental rental = new Rental();
        rental.setCar(car);
        rental.setClient(client);
        rental.setRentalDate(LocalDateTime.now());
        rental.setRentalStart(request.getRentalStart());
        rental.setRentalEnd(request.getRentalEnd());
        rental.setStatus(RentalStatus.RESERVED);

        // Calculate price
        long days = ChronoUnit.DAYS.between(request.getRentalStart(), request.getRentalEnd()) + 1;
        double totalPrice = days * car.getDailyRentalCost();
        rental.setFullPrice(totalPrice);

        // Save the rental
        rental = rentalRepository.save(rental);

        // Prepare response
        BookingResponse response = new BookingResponse();
        response.setBookingId(rental.getId());
        response.setStatus(rental.getStatus().name());
        response.setTotalCost(totalPrice);

        return response;
    }

    @Override
    public void startBooking(String bookingId) {
        Rental rental = rentalRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        if (rental.getStatus() != RentalStatus.RESERVED) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Booking can only be started from RESERVED status"
            );
        }

        rental.setStatus(RentalStatus.PICKED_UP);
        rentalRepository.save(rental);

        // Update car status
        carService.updateStatus(rental.getCar().getId(), "RENTED");
    }

    @Override
    public void returnBooking(String bookingId) {
        Rental rental = rentalRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        if (rental.getStatus() != RentalStatus.PICKED_UP) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Booking can only be returned from PICKED_UP status"
            );
        }

        rental.setStatus(RentalStatus.RETURNED);
        rentalRepository.save(rental);

        // Car status remains RENTED until inspection
    }

    @Override
    @Transactional
    public ReturnInspectionResponse finishBooking(String bookingId, ReturnInspectionRequest request) {
        Rental rental = rentalRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
        
        Worker worker = workerRepository.findById(request.getWorkerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Worker not found"));
        
        if (rental.getStatus() != RentalStatus.RETURNED) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Booking can only be inspected from RETURNED status"
            );
        }
        
        // Create inspection
        ReturnInspection inspection = new ReturnInspection();
        inspection.setInspectionDate(LocalDateTime.now());
        inspection.setRental(rental);
        inspection.setInspectedBy(worker);
        inspection.setWearLevelPercentage(request.getWearLevelPercentage());
        inspection.setDamagePenalty(request.getDamagePenalty());
        inspection.setCleaningFee(request.getCleaningFee());
        inspection.setNotes(request.getNotes());
        
        // Determine inspection status based on damage and wear
        InspectionStatus status = InspectionStatus.OK;
        
        if (request.getDamagePenalty() > 0) {
            status = InspectionStatus.FINED;
        } else if (request.getWearLevelPercentage() > 70) {
            status = InspectionStatus.NEEDS_REPAIR;
        }
        
        inspection.setStatus(status);
        
        // Save the inspection
        inspection = returnInspectionRepository.save(inspection);
        
        // Update rental status
        rental.setStatus(RentalStatus.INSPECTED);
        rentalRepository.save(rental);
        
        // Update car status to AVAILABLE
        carService.updateStatus(rental.getCar().getId(), "AVAILABLE");
        
        // Prepare response
        ReturnInspectionResponse response = new ReturnInspectionResponse();
        response.setInspectionId(inspection.getId());
        response.setStatus(inspection.getStatus().name());
        response.setTotalPenalty(inspection.getDamagePenalty() + inspection.getCleaningFee());
        
        return response;
    }

    @Override
    public List<UserBookingResponse> getUserBookings(String userId) {
        Client client = clientRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return client.getRentals().stream()
                .map(rental -> {
                    UserBookingResponse response = new UserBookingResponse();
                    response.setId(rental.getId());
                    response.setStart(rental.getRentalStart());
                    response.setEnd(rental.getRentalEnd());
                    response.setCarBrand(rental.getCar().getBrand());
                    response.setModel(rental.getCar().getModel());
                    
                    // Include both address and city in the location with null checks
                    String address = rental.getCar().getOffice() != null ? rental.getCar().getOffice().getAddress() : null;
                    String city = rental.getCar().getOffice() != null ? rental.getCar().getOffice().getCity() : null;
                    
                    if (address == null || address.isEmpty()) {
                        address = "Unknown address";
                    }
                    
                    if (city != null && !city.isEmpty()) {
                        response.setLocation(address + ", " + city);
                    } else {
                        response.setLocation(address);
                    }
                    
                    response.setStatus(rental.getStatus().name());
                    
                    // Add inspection details if the rental has been inspected
                    if (rental.getStatus() == RentalStatus.INSPECTED) {
                        ReturnInspection inspection = returnInspectionRepository.findByRental(rental)
                                .orElse(null);
                        
                        if (inspection != null) {
                            UserBookingResponse.InspectionDetailsDto inspectionDetails = new UserBookingResponse.InspectionDetailsDto();
                            inspectionDetails.setInspectionId(inspection.getId());
                            inspectionDetails.setWearLevelPercentage(inspection.getWearLevelPercentage());
                            inspectionDetails.setDamagePenalty(inspection.getDamagePenalty());
                            inspectionDetails.setCleaningFee(inspection.getCleaningFee());
                            inspectionDetails.setTotalPenalty(inspection.getDamagePenalty() + inspection.getCleaningFee());
                            inspectionDetails.setNotes(inspection.getNotes());
                            inspectionDetails.setStatus(inspection.getStatus().name());
                            
                            // Map damage reports
                            if (inspection.getDamageReports() != null && !inspection.getDamageReports().isEmpty()) {
                                List<UserBookingResponse.DamageReportDto> damageReportDtos = 
                                    inspection.getDamageReports().stream().map(dr -> {
                                        UserBookingResponse.DamageReportDto damageDto = 
                                                new UserBookingResponse.DamageReportDto();
                                        damageDto.setId(dr.getId());
                                        damageDto.setPartAffected(dr.getPartAffected());
                                        damageDto.setDescription(dr.getDescription());
                                        damageDto.setEstimatedRepairCost(dr.getEstimatedRepairCost());
                                        return damageDto;
                                    }).collect(Collectors.toList());
                                
                                inspectionDetails.setDamageReports(damageReportDtos);
                            } else {
                                inspectionDetails.setDamageReports(List.of());
                            }
                            
                            response.setInspectionDetails(inspectionDetails);
                        }
                    }
                    
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    public WorkerDashboardResponse getWorkerDashboard(String workerId) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Worker not found"));

        // Get pending inspections (only return inspections now - RETURNED status)
        List<WorkerDashboardResponse.RentalInspectionDTO> pendingInspections = rentalRepository.findByStatusAndWorkerId(
                        RentalStatus.RETURNED,
                        workerId
                ).stream()
                .map(rental -> {
                    WorkerDashboardResponse.RentalInspectionDTO dto = new WorkerDashboardResponse.RentalInspectionDTO();
                    dto.setRentalId(rental.getId());
                    dto.setCarBrand(rental.getCar().getBrand());
                    dto.setModel(rental.getCar().getModel());
                    dto.setLicensePlateNum(rental.getCar().getLicensePlateNum());
                    dto.setClientName(rental.getClient().getFullName());
                    dto.setClientContact(rental.getClient().getContactNumber());
                    dto.setStatus(rental.getStatus().name());
                    dto.setInspectionType("RETURN"); // Only return inspections
                    return dto;
                })
                .collect(Collectors.toList());

        // Get active rentals
        List<WorkerDashboardResponse.ActiveRentalDTO> activeRentals = rentalRepository.findByStatusInAndWorkerId(
                        List.of(RentalStatus.RESERVED, RentalStatus.PICKED_UP),
                        workerId
                ).stream()
                .map(rental -> {
                    WorkerDashboardResponse.ActiveRentalDTO dto = new WorkerDashboardResponse.ActiveRentalDTO();
                    dto.setRentalId(rental.getId());
                    dto.setCarBrand(rental.getCar().getBrand());
                    dto.setModel(rental.getCar().getModel());
                    dto.setLicensePlateNum(rental.getCar().getLicensePlateNum());
                    dto.setClientName(rental.getClient().getFullName());
                    dto.setClientContact(rental.getClient().getContactNumber());
                    dto.setStartDate(rental.getRentalStart().toString());
                    dto.setEndDate(rental.getRentalEnd().toString());
                    dto.setStatus(rental.getStatus().name());
                    return dto;
                })
                .collect(Collectors.toList());

        WorkerDashboardResponse response = new WorkerDashboardResponse();
        response.setPendingInspections(pendingInspections);
        response.setActiveRentals(activeRentals);
        response.setTotalPendingInspections(pendingInspections.size());
        response.setTotalActiveRentals(activeRentals.size());

        return response;
    }

    @Override
    public InspectionDetailsResponse getInspectionDetails(String rentalId) {
        Rental rental = rentalRepository.findById(rentalId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rental not found"));
        
        InspectionDetailsResponse response = new InspectionDetailsResponse();
        response.setRentalId(rental.getId());
        response.setCarBrand(rental.getCar().getBrand());
        response.setModel(rental.getCar().getModel());
        response.setLicensePlateNum(rental.getCar().getLicensePlateNum());
        response.setVin(rental.getCar().getVin());
        response.setClientName(rental.getClient().getFullName());
        response.setClientContact(rental.getClient().getContactNumber());
        response.setStartDate(rental.getRentalStart().toString());
        response.setEndDate(rental.getRentalEnd().toString());
        response.setStatus(rental.getStatus().name());
        response.setFullPrice(rental.getFullPrice());
        
        // Empty damage reports list - will be populated during inspection
        response.setDamageReports(List.of());
        
        return response;
    }

    @Override
    public List<CompletedInspectionResponse> getCompletedInspections(String workerId) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Worker not found"));
        
        // Find all inspections performed by this worker
        List<ReturnInspection> inspections = returnInspectionRepository.findByInspectedBy(worker);
        
        return inspections.stream().map(inspection -> {
            CompletedInspectionResponse dto = new CompletedInspectionResponse();
            dto.setInspectionId(inspection.getId());
            dto.setRentalId(inspection.getRental().getId());
            dto.setInspectionDate(inspection.getInspectionDate());
            dto.setCarBrand(inspection.getRental().getCar().getBrand());
            dto.setModel(inspection.getRental().getCar().getModel());
            dto.setLicensePlateNum(inspection.getRental().getCar().getLicensePlateNum());
            dto.setClientName(inspection.getRental().getClient().getFullName());
            dto.setStatus(inspection.getStatus().name());
            dto.setWearLevelPercentage(inspection.getWearLevelPercentage());
            dto.setDamagePenalty(inspection.getDamagePenalty());
            dto.setCleaningFee(inspection.getCleaningFee());
            dto.setTotalPenalty(inspection.getDamagePenalty() + inspection.getCleaningFee());
            dto.setNotes(inspection.getNotes());
            
            // Convert damage reports
            List<CompletedInspectionResponse.DamageReportDto> damageReportDtos = 
                    inspection.getDamageReports().stream().map(dr -> {
                        CompletedInspectionResponse.DamageReportDto damageDto = 
                                new CompletedInspectionResponse.DamageReportDto();
                        damageDto.setId(dr.getId());
                        damageDto.setPartAffected(dr.getPartAffected());
                        damageDto.setDescription(dr.getDescription());
                        damageDto.setEstimatedRepairCost(dr.getEstimatedRepairCost());
                        return damageDto;
                    }).collect(Collectors.toList());
            
            dto.setDamageReports(damageReportDtos);
            
            return dto;
        }).collect(Collectors.toList());
    }
}
