package db.com.rentalvehicle.repository;

import db.com.rentalvehicle.model.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkerRepository extends JpaRepository<Worker, String> {
}
