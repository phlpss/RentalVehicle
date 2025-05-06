-- First drop tables that depend on rental_status and inspection_status
DROP TABLE IF EXISTS damage_report CASCADE;
DROP TABLE IF EXISTS return_inspection CASCADE;
DROP TABLE IF EXISTS rental CASCADE;

-- Drop the enum types
DROP TYPE IF EXISTS rental_status CASCADE;
DROP TYPE IF EXISTS inspection_status CASCADE;

-- Recreate the rental table with VARCHAR instead of enum
CREATE TABLE rental (
    id VARCHAR(36) PRIMARY KEY,
    rental_date TIMESTAMP,
    rental_start TIMESTAMP,
    rental_end TIMESTAMP,
    status VARCHAR(16) CHECK (status IN ('ACTIVE', 'INACTIVE', 'RESERVED')),
    full_price DOUBLE PRECISION,
    client_id VARCHAR(36),
    worker_id VARCHAR(36),
    car_id VARCHAR(36),
    payment_id VARCHAR(36),
    FOREIGN KEY (client_id) REFERENCES client(id),
    FOREIGN KEY (worker_id) REFERENCES worker(id),
    FOREIGN KEY (car_id) REFERENCES car(id),
    FOREIGN KEY (payment_id) REFERENCES payment(id)
);

-- Recreate the return_inspection table with VARCHAR instead of enum
CREATE TABLE return_inspection (
    id VARCHAR(36) PRIMARY KEY,
    inspection_date TIMESTAMP,
    status VARCHAR(16) CHECK (status IN ('OK', 'NEEDS_REPAIR', 'FINED')),
    notes VARCHAR(1000),
    wear_level_percentage DOUBLE PRECISION,
    damage_penalty DOUBLE PRECISION,
    cleaning_fee DOUBLE PRECISION,
    rental_id VARCHAR(36) NOT NULL UNIQUE,
    inspected_by VARCHAR(36) NOT NULL,
    FOREIGN KEY (rental_id) REFERENCES rental(id),
    FOREIGN KEY (inspected_by) REFERENCES worker(id)
);

-- Recreate the damage_report table
CREATE TABLE damage_report (
    id VARCHAR(36) PRIMARY KEY,
    part_affected VARCHAR(255),
    description VARCHAR(1000),
    estimated_repair_cost DOUBLE PRECISION,
    inspection_id VARCHAR(36),
    FOREIGN KEY (inspection_id) REFERENCES return_inspection(id)
); 