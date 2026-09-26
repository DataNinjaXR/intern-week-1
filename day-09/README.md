# Day 9 — Angular + TypeScript + API Integration

## Project

**Facility Inspection Dashboard**

A simple Angular application connected to the Laravel REST API created in Day 8.

## Features

- Dashboard with facility metrics
- Facility list, search, filter and sort
- Facility details
- Inspection history
- New inspection form
- Form validation
- REST API integration
- Error handling
- Angular routing

## Technologies Used

- Angular
- TypeScript
- HTML & CSS
- Angular Router
- Reactive Forms
- HttpClient
- RxJS
- Laravel REST API
- MySQL

## Project Structure

day-09/
+-- .gitignore
+-- README.md
+-- angular-app/
+-- api-integration/
    +-- api-endpoints.md
    +-- testing.md

## API

The Angular application connects to the Laravel API:

http://127.0.0.1:8000/api

Main endpoints:

- /api/facilities
- /api/inspections
- /api/complaints

## Run the Project

### Start Laravel API

cd day-08\laravel-api
php artisan serve

### Start Angular Application

cd day-09\angular-app
ng serve

Open:

http://localhost:4200

## Learning Outcomes

Practiced Angular components, data binding, directives, services, dependency injection, routing, reactive forms, HttpClient, Observables, RxJS basics and REST API integration.
