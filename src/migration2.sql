-- PostgreSQL uses ALTER COLUMN, not MODIFY COLUMN

-- First drop the existing constraint if it exists
ALTER TABLE rental DROP CONSTRAINT IF EXISTS rental_status_check;

-- Add the constraint with current enum values
ALTER TABLE rental
    ADD CONSTRAINT rental_status_check
        CHECK (status IN ('RESERVED', 'PICKED_UP', 'RETURNED', 'INSPECTED'));