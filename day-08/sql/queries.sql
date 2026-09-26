-- =============================================================================
-- Facility Inspection and Complaint Management System
-- Required SQL Demonstration Queries (Day 8 Training)
-- Demonstrating 11 Core Relational Database Concepts
-- =============================================================================

USE `facility_management`;

-- =============================================================================
-- 1. SELECT & JOIN
-- Concept: Basic SELECT projection combined with INNER JOIN
-- Requirement: Display employee name, department name, position, and salary.
-- =============================================================================
SELECT 
    e.id AS employee_id,
    e.name AS employee_name,
    d.name AS department_name,
    e.position,
    e.salary
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;


-- =============================================================================
-- 2. WHERE Clause
-- Concept: Conditional Data Filtering
-- Requirement: Find facilities where the status indicates poor or critical condition.
-- =============================================================================
SELECT 
    id AS facility_id,
    name AS facility_name,
    location,
    type,
    status
FROM facilities
WHERE status IN ('Poor', 'Critical');


-- =============================================================================
-- 3. ORDER BY Clause
-- Concept: Sorting Result Sets
-- Requirement: List all facilities ordered alphabetically by name and type.
-- =============================================================================
SELECT 
    id,
    name,
    location,
    type,
    status
FROM facilities
ORDER BY name ASC, type DESC;


-- =============================================================================
-- 4. GROUP BY & COUNT
-- Concept: Data Aggregation by Category
-- Requirement: Calculate the total number of complaints logged per facility.
-- =============================================================================
SELECT 
    f.id AS facility_id,
    f.name AS facility_name,
    COUNT(c.id) AS total_complaints
FROM facilities f
LEFT JOIN complaints c ON f.id = c.facility_id
GROUP BY f.id, f.name;


-- =============================================================================
-- 5. HAVING Clause
-- Concept: Aggregate Filtering after GROUP BY
-- Requirement: Display facilities that have more than 1 complaint logged.
-- =============================================================================
SELECT 
    f.id AS facility_id,
    f.name AS facility_name,
    COUNT(c.id) AS complaint_count
FROM facilities f
INNER JOIN complaints c ON f.id = c.facility_id
GROUP BY f.id, f.name
HAVING COUNT(c.id) > 1;


-- =============================================================================
-- 6. AVG Aggregate Function
-- Concept: Mathematical Statistical Aggregation
-- Requirement: Calculate the average annual salary across all employees.
-- =============================================================================
SELECT 
    ROUND(AVG(salary), 2) AS average_employee_salary,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees;


-- =============================================================================
-- 7. Subquery (Scalar Subquery)
-- Concept: Nested SELECT Statements
-- Requirement: Find the employee details for the highest-paid staff member.
-- =============================================================================
SELECT 
    e.id,
    e.name AS employee_name,
    e.position,
    e.salary,
    d.name AS department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
WHERE e.salary = (
    SELECT MAX(salary) 
    FROM employees
);


-- =============================================================================
-- 8. Inspection History Query
-- Concept: Multi-table JOIN with Multi-column Sorting
-- Requirement: Display complete inspection history with facility details ordered by date.
-- =============================================================================
SELECT 
    i.id AS inspection_id,
    f.name AS facility_name,
    f.location,
    i.inspector_name,
    i.inspection_date,
    i.condition AS assessed_condition,
    i.remarks
FROM inspections i
INNER JOIN facilities f ON i.facility_id = f.id
ORDER BY i.inspection_date DESC, f.name ASC;


-- =============================================================================
-- 9. Index Demonstration
-- Concept: Database B-Tree Indexing for Search Acceleration
-- Explanation: Foreign key columns and filter targets are indexed to change full
-- table scans O(N) into indexed lookups O(log N).
-- =============================================================================
CREATE INDEX idx_employees_dept ON employees(department_id);
CREATE INDEX idx_inspections_fac ON inspections(facility_id);
CREATE INDEX idx_complaints_fac ON complaints(facility_id);

-- Explain execution path utilizing the index
EXPLAIN SELECT * FROM complaints WHERE facility_id = 4 AND status = 'Open';


-- =============================================================================
-- 10. Database Transaction
-- Concept: ACID Multi-Operation Atomicity
-- Requirement: Log an emergency inspection and atomically update facility status.
-- =============================================================================
START TRANSACTION;

-- Operation A: Insert urgent inspection audit
INSERT INTO inspections (facility_id, inspector_name, inspection_date, `condition`, remarks, created_at, updated_at)
VALUES (4, 'Safety Response Auditor', CURDATE(), 'Critical', 'Emergency structural crack detected on ramp level 3.', NOW(), NOW());

-- Operation B: Update target facility status
UPDATE facilities
SET status = 'Critical', updated_at = NOW()
WHERE id = 4;

-- Commit operations atomically
COMMIT;

-- Rollback if any failure occurred:
-- ROLLBACK;


-- =============================================================================
-- 11. Complete JOIN Query
-- Concept: Joining 3 Tables (Facility + Inspection + Complaint Summary)
-- Requirement: Summary overview linking facilities with their latest inspection & complaints.
-- =============================================================================
SELECT 
    f.name AS facility_name,
    f.status AS current_status,
    i.inspector_name AS last_inspector,
    i.inspection_date AS last_inspected,
    c.title AS complaint_title,
    c.priority AS complaint_priority
FROM facilities f
LEFT JOIN inspections i ON f.id = i.facility_id
LEFT JOIN complaints c ON f.id = c.facility_id
ORDER BY f.id ASC;
