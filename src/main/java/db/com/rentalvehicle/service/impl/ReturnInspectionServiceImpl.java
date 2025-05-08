package db.com.rentalvehicle.service.impl;

import db.com.rentalvehicle.dto.ReturnInspectionRequest;
import db.com.rentalvehicle.dto.ReturnInspectionResponse;
import db.com.rentalvehicle.model.Car;
import db.com.rentalvehicle.model.DamageReport;
import db.com.rentalvehicle.model.InspectionStatus;
import db.com.rentalvehicle.model.Rental;
import db.com.rentalvehicle.model.RentalStatus;
import db.com.rentalvehicle.model.ReturnInspection;
import db.com.rentalvehicle.model.Worker;
import db.com.rentalvehicle.repository.CarRepository;
import db.com.rentalvehicle.repository.DamageReportRepository;
import db.com.rentalvehicle.repository.RentalRepository;
import db.com.rentalvehicle.repository.ReturnInspectionRepository;
import db.com.rentalvehicle.repository.WorkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReturnInspectionServiceImpl  {

    private final ReturnInspectionRepository returnInspectionRepository;
    private final RentalRepository rentalRepository;
    private final WorkerRepository workerRepository;
    private final DamageReportRepository damageReportRepository;
    private final CarRepository carRepository;

    @Transactional
    public ReturnInspectionResponse submitInspection(String rentalId, ReturnInspectionRequest request) {
        Rental rental = rentalRepository.findById(rentalId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rental not found"));

        if (rental.getStatus() != RentalStatus.RETURNED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rental is not in RETURNED status");
        }

        Worker worker = workerRepository.findById(request.getWorkerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Worker not found"));

        ReturnInspection inspection = new ReturnInspection();
        inspection.setId(UUID.randomUUID().toString());
        inspection.setInspectionDate(LocalDateTime.now());
        
        // Set status based on request or determine from damage and wear level
        InspectionStatus status = InspectionStatus.OK;
        if (request.getStatus() != null && !request.getStatus().isEmpty()) {
            try {
                status = InspectionStatus.valueOf(request.getStatus());
            } catch (IllegalArgumentException e) {
                // Fallback to determining status from damage values
                if (request.getDamagePenalty() > 0) {
                    status = InspectionStatus.FINED;
                } else if (request.getWearLevelPercentage() > 70) {
                    status = InspectionStatus.NEEDS_REPAIR;
                }
            }
        } else {
            // No status provided, determine from damage values
            if (request.getDamagePenalty() > 0) {
                status = InspectionStatus.FINED;
            } else if (request.getWearLevelPercentage() > 70) {
                status = InspectionStatus.NEEDS_REPAIR;
            }
        }
        
        inspection.setStatus(status);
        inspection.setNotes(request.getNotes());
        inspection.setWearLevelPercentage(request.getWearLevelPercentage());
        inspection.setDamagePenalty(request.getDamagePenalty());
        inspection.setCleaningFee(request.getCleaningFee());
        inspection.setRental(rental);
        inspection.setInspectedBy(worker);

        ReturnInspection savedInspection = returnInspectionRepository.save(inspection);

        // Process damage reports if any
        boolean hasDamage = false;
        if (request.getDamageReports() != null && !request.getDamageReports().isEmpty()) {
            hasDamage = true;
            for (ReturnInspectionRequest.DamageReportDto damageDto : request.getDamageReports()) {
                DamageReport damage = new DamageReport();
                damage.setId(UUID.randomUUID().toString());
                damage.setPartAffected(damageDto.getPartAffected());
                damage.setDescription(damageDto.getDescription());
                damage.setEstimatedRepairCost(damageDto.getEstimatedRepairCost());
                damage.setInspection(savedInspection);
                damageReportRepository.save(damage);
            }
        }

        // Update rental status to INSPECTED
        rental.setStatus(RentalStatus.INSPECTED);
        rentalRepository.save(rental);

        // If there are damage reports or status is NEEDS_REPAIR/FINED, update car status
        if (hasDamage || status == InspectionStatus.NEEDS_REPAIR || status == InspectionStatus.FINED) {
            Car car = rental.getCar();
            if (car != null) {
                car.setStatus("NEEDS_REPAIR");
                carRepository.save(car);
            }
        }

        return new ReturnInspectionResponse(
                savedInspection.getId(),
                savedInspection.getStatus().name(),
                savedInspection.getDamagePenalty() + savedInspection.getCleaningFee());
    }

    public List<ReturnInspection> getCompletedInspections(String workerId) {
        return returnInspectionRepository.findByInspectedById(workerId);
    }
}