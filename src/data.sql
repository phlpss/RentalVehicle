-- Insert Offices
INSERT INTO office (id, address, contact_number, city) VALUES
('1', '123 Main Street', '+1234567890', 'New York'),
('2', '456 Park Avenue', '+1987654321', 'Los Angeles'),
('3', '789 Market Street', '+1122334455', 'San Francisco');

-- Insert Workers
INSERT INTO worker (id, full_name, contact_number, email, address, position) VALUES
('1', 'John Smith', '+1234567891', 'john.smith@rental.com', '100 Worker St', 'MANAGER'),
('2', 'Sarah Johnson', '+1234567892', 'sarah.j@rental.com', '101 Worker St', 'ASSISTANT'),
('3', 'Mike Brown', '+1234567893', 'mike.b@rental.com', '102 Worker St', 'ASSISTANT');

-- Insert Clients
INSERT INTO client (id, full_name, contact_number, email, rating, address, driver_license_number) VALUES
('1', 'Alice Cooper', '+9876543210', 'alice@email.com', 4.5, '200 Client Ave', 'DL123456'),
('2', 'Bob Wilson', '+9876543211', 'bob@email.com', 4.8, '201 Client Ave', 'DL234567'),
('3', 'Carol Davis', '+9876543212', 'carol@email.com', 4.2, '202 Client Ave', 'DL345678');

-- Insert Cars
INSERT INTO car (id, vin, license_plate_num, color, status, mileage, fuel_type, transmission_type, brand, model, year, category, seats_number, daily_rental_cost, office_id) VALUES
('1', 'VIN123456', 'ABC123', 'Red', 'AVAILABLE', '50000', 'PETROL', 'AUTOMATIC', 'Toyota', 'Camry', 2020, 'SEDAN', 5, 50.00, '1'),
('2', 'VIN234567', 'DEF456', 'Blue', 'AVAILABLE', '30000', 'HYBRID', 'AUTOMATIC', 'Honda', 'Civic', 2021, 'COMPACT', 5, 45.00, '1'),
('3', 'VIN345678', 'GHI789', 'Black', 'AVAILABLE', '20000', 'ELECTRIC', 'AUTOMATIC', 'Tesla', 'Model 3', 2022, 'LUXURY', 5, 80.00, '2');

-- Insert Suppliers
INSERT INTO supplier (id, full_name, email, contact_number, address) VALUES
('1', 'Auto Supply Co', 'contact@autosupply.com', '+1112223333', '300 Supplier Blvd'),
('2', 'Car Parts Inc', 'sales@carparts.com', '+1112223334', '301 Supplier Blvd'),
('3', 'Vehicle Solutions', 'info@vehiclesolutions.com', '+1112223335', '302 Supplier Blvd');

-- Insert Purchases
INSERT INTO purchase (id, purchase_date, total_price, invoice_number, status, supplier_id) VALUES
('1', '2024-01-15', 25000.00, 'INV001', 'COMPLETED', '1'),
('2', '2024-02-01', 30000.00, 'INV002', 'COMPLETED', '2'),
('3', '2024-02-15', 35000.00, 'INV003', 'PENDING', '3');

-- Insert Purchase Details
INSERT INTO purchase_details (id, amount, price, purchase_id) VALUES
('1', 1, 25000.00, '1'),
('2', 1, 30000.00, '2'),
('3', 1, 35000.00, '3');

-- Insert Deliveries
INSERT INTO delivery (id, delivery_date, purchase_id, office_id) VALUES
('1', '2024-01-20', '1', '1'),
('2', '2024-02-05', '2', '2'),
('3', '2024-02-20', '3', '3');

-- Insert Payments
INSERT INTO payment (id, payment_date, fine, total, payment_type) VALUES
('1', '2024-03-01', 0.00, 150.00, 'CASH'),
('2', '2024-03-02', 50.00, 200.00, 'APPLE_PAY'),
('3', '2024-03-03', 0.00, 180.00, 'GOOGLE_PAY');

-- Insert Rentals
INSERT INTO rental (id, rental_date, rental_start, rental_end, status, full_price, client_id, worker_id, car_id, payment_id) VALUES
('1', '2024-03-01 10:00:00', '2024-03-01 10:00:00', '2024-03-03 10:00:00', 'ACTIVE', 150.00, '1', '1', '1', '1'),
('2', '2024-03-02 11:00:00', '2024-03-02 11:00:00', '2024-03-04 11:00:00', 'ACTIVE', 200.00, '2', '2', '2', '2'),
('3', '2024-03-03 12:00:00', '2024-03-03 12:00:00', '2024-03-05 12:00:00', 'RESERVED', 180.00, '3', '3', '3', '3');

-- Insert Return Inspections
INSERT INTO return_inspection (id, inspection_date, status, notes, wear_level_percentage, damage_penalty, cleaning_fee, rental_id, inspected_by) VALUES
('1', '2024-03-03 10:00:00', 'OK', 'Vehicle in good condition', 5.0, 0.00, 0.00, '1', '1'),
('2', '2024-03-04 11:00:00', 'NEEDS_REPAIR', 'Minor scratch on passenger door', 10.0, 50.00, 0.00, '2', '2'),
('3', '2024-03-05 12:00:00', 'FINED', 'Interior cleaning required', 15.0, 0.00, 30.00, '3', '3');

-- Insert Damage Reports
INSERT INTO damage_report (id, part_affected, description, estimated_repair_cost, inspection_id) VALUES
('1', 'Passenger Door', 'Minor scratch, 5cm long', 200.00, '2'),
('2', 'Front Bumper', 'Small dent', 300.00, '2'),
('3', 'Rear Seat', 'Stain on fabric', 150.00, '3');