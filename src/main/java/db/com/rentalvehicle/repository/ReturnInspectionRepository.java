package db.com.rentalvehicle.repository;

import db.com.rentalvehicle.model.Rental;
import db.com.rentalvehicle.model.ReturnInspection;
import db.com.rentalvehicle.model.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReturnInspectionRepository extends JpaRepository<ReturnInspection, String> {
    List<ReturnInspection> findByInspectedBy(Worker worker);
    Optional<ReturnInspection> findByRental(Rental rental);
}
