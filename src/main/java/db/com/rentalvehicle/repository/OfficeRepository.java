package db.com.rentalvehicle.repository;

import db.com.rentalvehicle.model.Office;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfficeRepository extends JpaRepository<Office, String> {
} 