-- Enums
CREATE TYPE worker_position AS ENUM ('MANAGER', 'ASSISTANT');
CREATE TYPE purchase_status AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');
CREATE TYPE payment_type AS ENUM ('CASH', 'APPLE_PAY', 'GOOGLE_PAY', 'IBAN');

-- Office table
CREATE TABLE office (
    id VARCHAR(36) PRIMARY KEY,
    address VARCHAR(255),
    contact_number VARCHAR(255),
    city VARCHAR(255)
);

-- Worker table
CREATE TABLE worker (
    id VARCHAR(36) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    address VARCHAR(255),
    position worker_position
);

-- Client table
CREATE TABLE client (
    id VARCHAR(36) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    rating DOUBLE PRECISION,
    address VARCHAR(255),
    driver_license_number VARCHAR(255) NOT NULL
);

-- Car table
CREATE TABLE car (
    id VARCHAR(36) PRIMARY KEY,
    vin VARCHAR(255),
    license_plate_num VARCHAR(255),
    color VARCHAR(255),
    status VARCHAR(255),
    mileage VARCHAR(255),
    fuel_type VARCHAR(255),
    transmission_type VARCHAR(255),
    brand VARCHAR(255),
    model VARCHAR(255),
    year INTEGER,
    category VARCHAR(255),
    seats_number INTEGER,
    daily_rental_cost DOUBLE PRECISION,
    office_id VARCHAR(36),
    FOREIGN KEY (office_id) REFERENCES office(id)
);

-- Payment table
CREATE TABLE payment (
    id VARCHAR(36) PRIMARY KEY,
    payment_date DATE,
    fine DOUBLE PRECISION,
    total DOUBLE PRECISION,
    payment_type payment_type
);

-- Rental table
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

-- Supplier table
CREATE TABLE supplier (
    id VARCHAR(36) PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255),
    contact_number VARCHAR(255),
    address VARCHAR(255)
);

-- Purchase table
CREATE TABLE purchase (
    id VARCHAR(36) PRIMARY KEY,
    purchase_date DATE,
    total_price DOUBLE PRECISION,
    invoice_number VARCHAR(255),
    status purchase_status,
    supplier_id VARCHAR(36),
    FOREIGN KEY (supplier_id) REFERENCES supplier(id)
);

-- Purchase Details table
CREATE TABLE purchase_details (
    id VARCHAR(36) PRIMARY KEY,
    amount INTEGER,
    price DOUBLE PRECISION,
    purchase_id VARCHAR(36),
    FOREIGN KEY (purchase_id) REFERENCES purchase(id)
);

-- Delivery table
CREATE TABLE delivery (
    id VARCHAR(36) PRIMARY KEY,
    delivery_date DATE,
    purchase_id VARCHAR(36) NOT NULL UNIQUE,
    office_id VARCHAR(36),
    FOREIGN KEY (purchase_id) REFERENCES purchase(id),
    FOREIGN KEY (office_id) REFERENCES office(id)
);

-- Return Inspection table
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

-- Damage Report table
CREATE TABLE damage_report (
    id VARCHAR(36) PRIMARY KEY,
    part_affected VARCHAR(255),
    description VARCHAR(1000),
    estimated_repair_cost DOUBLE PRECISION,
    inspection_id VARCHAR(36),
    FOREIGN KEY (inspection_id) REFERENCES return_inspection(id)
);