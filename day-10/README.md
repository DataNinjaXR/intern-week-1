# Campus Facility Management & Booking System

A web-based facility management and booking system designed for colleges/institutions. It allows students and faculty to check facility availability and request bookings, while administrators manage facilities, bookings, maintenance, users, and reports.

## Features

- JWT-based Login & Registration
- Student, Faculty and Admin roles
- Facility search and availability
- Facility booking with conflict validation
- Student/Faculty role-based booking limits
- Faculty-only facilities
- Admin booking approval/rejection
- Facility maintenance management
- User management
- Basic usage reports
- Angular reusable Facility Availability component

## Role Access

### Student
- View facilities
- Check availability
- Request/cancel own bookings
- Maximum booking duration: 2 hours
- Advance booking: 30 days

### Faculty
- All normal booking features
- Access Faculty-only facilities
- Maximum booking duration: 4 hours
- Advance booking: 60 days

### Admin
- Manage facilities
- Approve/reject bookings
- Manage maintenance
- Manage users
- View reports

## Technology Stack

**Frontend:** React, JavaScript, Tailwind CSS, Axios  
**Backend:** Node.js, Express.js  
**Database:** MySQL  
**Authentication:** JWT, bcrypt  
**Additional:** Angular reusable component

## Project Structure

```text
Day-10/
├── frontend/
├── backend/
└── angular-component/

## Local setup

### 1. Database
1. Start MySQL 8.0.
2. Run `backend/schema.sql` in MySQL Workbench or the MySQL CLI.
3. Copy `backend/.env.example` to `backend/.env` and set your MySQL root password.
4. From `backend`, run `npm install`, then `npm run seed`.

### 2. Backend
From `backend`: `npm run dev` (or `npm start`). The API runs at `http://localhost:5000`.
Test `http://localhost:5000/api/health` and `http://localhost:5000/api/db-test`.

### 3. React frontend
From `frontend`: `npm install` then `npm run dev`. Open the URL printed by Vite (normally `http://localhost:5173`).

### Demo accounts
- Admin: `admin@campus.com` / `Admin@123`
- Student: `student@campus.com` / `Student@123`
- Faculty: `faculty@campus.com` / `Faculty@123`

The Angular project in `angular-component` is a separate reusable component demo; it is not required to run the main React + Node + MySQL application.
