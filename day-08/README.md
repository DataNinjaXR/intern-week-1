# Day 8 — Database + Laravel

A simple **Facility Inspection and Complaint Management System** built to practice relational databases and Laravel REST APIs.

## Project Structure

```text
Day-8/
├── sql/
│   ├── schema.sql
│   ├── sample-data.sql
│   └── queries.sql
├── database/
│   └── README.md
├── laravel-api/
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── ...
└── README.md
```

## SQL & Database

The project demonstrates:

* Tables, rows and columns
* Primary and foreign keys
* Relationships
* CRUD operations
* SELECT, WHERE, ORDER BY
* GROUP BY and HAVING
* JOINs
* Subqueries
* Indexes
* Transactions

### Main Tables

* Users
* Departments
* Employees
* Facilities
* Inspections
* Complaints

## Laravel

The Laravel API demonstrates:

* Routing
* Controllers
* Models
* Migrations
* Eloquent ORM
* Relationships
* Validation
* Middleware basics
* REST API development
* CRUD operations

### API Resources

```text
/api/facilities
/api/inspections
/api/complaints
```

Each resource supports CRUD operations.

## Request Flow

```text
Request
   ↓
Route
   ↓
Controller
   ↓
Model / Eloquent
   ↓
Database
   ↓
JSON Response
```

## Running the Project

```bash
cd laravel-api
php artisan serve
```

The API runs at:

```text
http://127.0.0.1:8000
```

Example:

```text
GET /api/facilities
GET /api/inspections
GET /api/complaints
```

## Objective

To understand relational database concepts and implement backend REST APIs using **Laravel and MySQL**.
