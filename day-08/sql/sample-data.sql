-- =============================================================================
-- Facility Inspection and Complaint Management System
-- Sample Data Insertion Script (DML)
-- =============================================================================

USE `facility_management`;

-- -----------------------------------------------------------------------------
-- 1. Insert Users (1 record)
-- -----------------------------------------------------------------------------
INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Admin User', 'admin@facility.com', '$2y$12$e6/K6Z0x5e...samplehash', NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 2. Insert Departments (3 records)
-- -----------------------------------------------------------------------------
INSERT INTO `departments` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Operations', 'Manages daily facility operations, scheduling, and logistics.', NOW(), NOW()),
(2, 'Maintenance', 'Handles equipment repairs, HVAC servicing, and structure maintenance.', NOW(), NOW()),
(3, 'Health & Safety', 'Ensures environmental safety compliance and risk assessments.', NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 3. Insert Employees (7 records)
-- -----------------------------------------------------------------------------
INSERT INTO `employees` (`id`, `department_id`, `name`, `email`, `position`, `salary`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sarah Jenkins', 'sarah.j@facility.com', 'Operations Director', 115000.00, NOW(), NOW()),
(2, 1, 'Michael Chang', 'michael.c@facility.com', 'Logistics Coordinator', 68000.00, NOW(), NOW()),
(3, 2, 'Robert Miller', 'robert.m@facility.com', 'Chief Engineer', 105000.00, NOW(), NOW()),
(4, 2, 'James Wilson', 'james.w@facility.com', 'HVAC Technician', 58000.00, NOW(), NOW()),
(5, 2, 'Carlos Gomez', 'carlos.g@facility.com', 'Electrician', 64000.00, NOW(), NOW()),
(6, 3, 'Dr. Elena Rostova', 'elena.r@facility.com', 'Safety Officer', 95000.00, NOW(), NOW()),
(7, 3, 'Kevin Patel', 'kevin.p@facility.com', 'Environmental Inspector', 72000.00, NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 4. Insert Facilities (5 records)
-- -----------------------------------------------------------------------------
INSERT INTO `facilities` (`id`, `name`, `location`, `type`, `status`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Main HQ Tower', 'Building A, Downtown Plaza', 'Office Building', 'Good', '12-story primary corporate headquarters building with modern amenities.', NOW(), NOW()),
(2, 'West Wing Research Lab', 'Building B, Science Park', 'Laboratory', 'Average', 'High-tech testing laboratory with specialized ventilation requirements.', NOW(), NOW()),
(3, 'Central Logistics Depot', 'Zone 4, Industrial Logistics Center', 'Warehouse', 'Poor', 'Heavy distribution warehouse experiencing roof leakage and pavement degradation.', NOW(), NOW()),
(4, 'North Multi-Level Parking', 'North Campus Perimeter', 'Parking Structure', 'Critical', '4-level concrete garage with structural concrete cracking and lighting failures.', NOW(), NOW()),
(5, 'East Campus Cafeteria', 'Building C, Ground Level', 'Dining Facility', 'Good', 'Commercial kitchen and dining hall serving employees daily.', NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 5. Insert Inspections (7 records)
-- -----------------------------------------------------------------------------
INSERT INTO `inspections` (`id`, `facility_id`, `inspector_name`, `inspection_date`, `condition`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 1, 'Kevin Patel', '2026-08-10', 'Good', 'HVAC operating efficiently. Emergency exits clear and properly illuminated.', NOW(), NOW()),
(2, 1, 'Dr. Elena Rostova', '2026-09-15', 'Good', 'Fire extinguishers inspected and certified. Elevators functioning normally.', NOW(), NOW()),
(3, 2, 'Kevin Patel', '2026-08-18', 'Average', 'Fume hood #3 needs filter replacement. Eyewash stations checked.', NOW(), NOW()),
(4, 3, 'Robert Miller', '2026-07-25', 'Poor', 'Roof membrane leaking near loading bay 2. Forklift charging station wiring worn.', NOW(), NOW()),
(5, 4, 'Robert Miller', '2026-08-01', 'Critical', 'Concrete spalling on Level 3 ramp. 12 overhead lights burned out causing dark spots.', NOW(), NOW()),
(6, 4, 'Dr. Elena Rostova', '2026-09-10', 'Critical', 'Urgent structural engineering review recommended for Level 2 support column.', NOW(), NOW()),
(7, 5, 'Kevin Patel', '2026-09-05', 'Good', 'Kitchen sanitation standards met. Grease trap serviced recently.', NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 6. Insert Complaints (7 records)
-- -----------------------------------------------------------------------------
INSERT INTO `complaints` (`id`, `facility_id`, `title`, `description`, `status`, `priority`, `created_at`, `updated_at`) VALUES
(1, 4, 'Severe ramp concrete cracking', 'Deep structural cracks visible on the Level 3 access ramp posing safety risks.', 'Open', 'Critical', NOW(), NOW()),
(2, 4, 'Dark stairwells due to blown bulbs', 'Multiple stairwell light fixtures out on Levels 2 and 4, creating hazards at night.', 'In Progress', 'High', NOW(), NOW()),
(3, 4, 'Broken barrier gate at exit', 'Automatic gate arm stuck in raised position, allowing unauthorized parking.', 'Resolved', 'Medium', NOW(), NOW()),
(4, 3, 'Active roof leak during heavy rain', 'Water dripping onto inventory near loading dock bay 2.', 'Open', 'Critical', NOW(), NOW()),
(5, 3, 'Loading dock door roller jammed', 'Bay door #4 cannot close completely, exposing warehouse to outside temperature.', 'In Progress', 'High', NOW(), NOW()),
(6, 2, 'Exhaust hood #3 airflow warning', 'Airflow velocity sensor intermittently alarms during chemical preparation.', 'In Progress', 'High', NOW(), NOW()),
(7, 1, 'Air conditioning weak on 8th Floor', 'Occupants reporting warm office temperatures above 26°C.', 'Resolved', 'Low', NOW(), NOW());
