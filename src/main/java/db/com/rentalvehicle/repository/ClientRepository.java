package db.com.rentalvehicle.repository;

import db.com.rentalvehicle.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, String> {
} 