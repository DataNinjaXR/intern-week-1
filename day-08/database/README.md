# Database Structure & Relationships Documentation

This folder documents the relational database design for the **Facility Inspection and Complaint Management System**.

---

## Entity Relationship Model

The system manages six core tables designed using 3rd Normal Form (3NF) relational constraints:

```text
               ┌───────────────┐
               │  departments  │
               └───────┬───────┘
                       │ 1
                       │
                       │ *
               ┌───────┴───────┐
               │   employees   │
               └───────────────┘

               ┌───────────────┐
               │  facilities   │
               └───────┬───────┘
                       │
        ┌──────────────┴──────────────┐
        │ 1                           │ 1
        │ *                           │ *
 ┌──────┴────────┐             ┌──────┴────────┐
 │  inspections  │             │  complaints   │
 └───────────────┘             └───────────────┘
```

---

## Foreign Key Relationships

1. **Department to Employee (1:N)**:
   * `Department hasMany Employees`
   * `Employee belongsTo Department`
   * Foreign Key: `employees.department_id → departments.id`
   * On Delete: `CASCADE`

2. **Facility to Inspection (1:N)**:
   * `Facility hasMany Inspections`
   * `Inspection belongsTo Facility`
   * Foreign Key: `inspections.facility_id → facilities.id`
   * On Delete: `CASCADE`

3. **Facility to Complaint (1:N)**:
   * `Facility hasMany Complaints`
   * `Complaint belongsTo Facility`
   * Foreign Key: `complaints.facility_id → facilities.id`
   * On Delete: `CASCADE`

---

## Data Dictionary

### 1. `users`
* `id` (BIGINT UNSIGNED, Primary Key, Auto Increment)
* `name` (VARCHAR 255)
* `email` (VARCHAR 255, Unique Index)
* `password` (VARCHAR 255)
* `timestamps` (`created_at`, `updated_at`)

### 2. `departments`
* `id` (BIGINT UNSIGNED, Primary Key, Auto Increment)
* `name` (VARCHAR 255)
* `description` (TEXT, Nullable)
* `timestamps` (`created_at`, `updated_at`)

### 3. `employees`
* `id` (BIGINT UNSIGNED, Primary Key, Auto Increment)
* `department_id` (BIGINT UNSIGNED, Foreign Key, Indexed)
* `name` (VARCHAR 255)
* `email` (VARCHAR 255, Unique Index)
* `position` (VARCHAR 255)
* `salary` (DECIMAL 10,2)
* `timestamps` (`created_at`, `updated_at`)

### 4. `facilities`
* `id` (BIGINT UNSIGNED, Primary Key, Auto Increment)
* `name` (VARCHAR 255)
* `location` (VARCHAR 255)
* `type` (VARCHAR 255)
* `status` (VARCHAR 50: `Good`, `Average`, `Poor`, `Critical`)
* `description` (TEXT, Nullable)
* `timestamps` (`created_at`, `updated_at`)

### 5. `inspections`
* `id` (BIGINT UNSIGNED, Primary Key, Auto Increment)
* `facility_id` (BIGINT UNSIGNED, Foreign Key, Indexed)
* `inspector_name` (VARCHAR 255)
* `inspection_date` (DATE)
* `condition` (VARCHAR 50: `Good`, `Average`, `Poor`, `Critical`)
* `remarks` (TEXT, Nullable)
* `timestamps` (`created_at`, `updated_at`)

### 6. `complaints`
* `id` (BIGINT UNSIGNED, Primary Key, Auto Increment)
* `facility_id` (BIGINT UNSIGNED, Foreign Key, Indexed)
* `title` (VARCHAR 255)
* `description` (TEXT)
* `status` (VARCHAR 50: `Open`, `In Progress`, `Resolved`)
* `priority` (VARCHAR 50: `Low`, `Medium`, `High`, `Critical`)
* `timestamps` (`created_at`, `updated_at`)

---

## Migration & Execution

Laravel migrations and seeders for these database tables are maintained inside the application root at:

```text
laravel-api/database/migrations/
laravel-api/database/seeders/
```
