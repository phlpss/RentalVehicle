package db.com.rentalvehicle.repository;

import db.com.rentalvehicle.model.DamageReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DamageReportRepository extends JpaRepository<DamageReport, String> {
    List<DamageReport> findByInspectionId(String inspectionId);
} 