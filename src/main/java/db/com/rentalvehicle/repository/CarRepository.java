package db.com.rentalvehicle.repository;

import db.com.rentalvehicle.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car,String> {
    List<Car> findByOffice_Id(String officeId);
}
