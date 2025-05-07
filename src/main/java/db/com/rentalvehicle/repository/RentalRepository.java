package db.com.rentalvehicle.repository;

import db.com.rentalvehicle.model.Rental;
import db.com.rentalvehicle.model.RentalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, String> {
    
    @Query("SELECT r FROM Rental r WHERE r.car.id = :carId " +
           "AND ((r.rentalStart <= :end AND r.rentalEnd >= :start) " +
           "OR (r.rentalStart >= :start AND r.rentalStart <= :end) " +
           "OR (r.rentalEnd >= :start AND r.rentalEnd <= :end))")
    List<Rental> findOverlappingRentals(
            @Param("carId") String carId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end);
    
    List<Rental> findByCarId(String carId);

    Collection<Rental> findByStatusInAndWorkerId(List<RentalStatus> list, String workerId);

    Collection<Rental> findByStatusAndWorkerId(RentalStatus rentalStatus, String workerId);
}