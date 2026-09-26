# API Integration Testing

## Purpose

This document explains how the Angular application is tested with the Laravel REST API.

## Requirements

Before testing the Angular application, make sure:

* PHP and Laravel are installed.
* The Laravel API from Day 8 is available.
* Angular is installed.
* Node.js and npm are installed.
* The database is running.

## Step 1: Start Laravel API

Open a terminal and run:

```text
cd "C:\Users\Pranay Charde\Desktop\intern-week-1\day-08\laravel-api"
php artisan serve
```

The API will run at:

```text
http://127.0.0.1:8000
```

## Step 2: Start Angular Application

Open another terminal and run:

```text
cd "C:\Users\Pranay Charde\Desktop\intern-week-1\day-09\angular-app"
ng serve
```

The Angular application will run at:

```text
http://localhost:4200
```

## Step 3: Test Facility API

Open the following API endpoint in a browser:

```text
http://127.0.0.1:8000/api/facilities
```

The API should return facility data in JSON format.

## Step 4: Test Angular Dashboard

Open:

```text
http://localhost:4200
```

The dashboard should display:

* Total facilities
* Total inspections
* Average inspection score
* Good facilities
* Facility summary

## Step 5: Test Facility List

Open:

```text
http://localhost:4200/facilities
```

The page should display the facility data received from the Laravel API.

The following features can be tested:

* Search facility
* Filter by status
* Sort by name
* Sort by cleanliness score
* View facility details

## Step 6: Test Facility Details

Click **View Details** for any facility.

The application should open a URL similar to:

```text
http://localhost:4200/facilities/2
```

The facility details should be loaded from the Laravel API.

## Step 7: Test Inspection History

Open:

```text
http://localhost:4200/inspections
```

The application should display inspection records from the API.

## Step 8: Test Inspection Form

Open:

```text
http://localhost:4200/inspections/new
```

Enter:

* Facility
* Inspector name
* Inspection date
* Score
* Remarks

Click **Submit Inspection**.

The Angular application sends a POST request to:

```text
http://127.0.0.1:8000/api/inspections
```

After successful submission, a success message should be displayed.

## Error Handling

If the API is unavailable, the Angular application displays an error message instead of stopping the application.

Example:

```text
Unable to load facility data.
```

## Technologies Tested

* Angular
* TypeScript
* Angular Router
* Reactive Forms
* HttpClient
* Observables
* RxJS
* Laravel REST API
* MySQL

## Result

The Angular frontend successfully communicates with the Laravel REST API using HTTP requests and displays the returned data in the application.
