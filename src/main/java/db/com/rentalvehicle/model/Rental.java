package db.com.rentalvehicle.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
public class Rental {
    @Id
    private String id = UUID.randomUUID().toString();

    private LocalDateTime rentalDate;
    private LocalDateTime rentalStart;
    private LocalDateTime rentalEnd;

    @Enumerated(EnumType.STRING)
    private RentalStatus status;

    private double fullPrice;

    @ManyToOne
    @JoinColumn(name = "client_id")
    @ToString.Exclude
    private Client client;

    @ManyToOne
    @JoinColumn(name = "worker_id")
    @ToString.Exclude
    private Worker worker;

    @ManyToOne
    @JoinColumn(name = "car_id")
    @ToString.Exclude
    private Car car;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_id")
    @ToString.Exclude
    private Payment payment;
}