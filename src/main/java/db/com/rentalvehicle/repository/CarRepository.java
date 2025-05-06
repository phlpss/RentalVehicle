package db.com.rentalvehicle.repository;

import db.com.rentalvehicle.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car,String> {
}
