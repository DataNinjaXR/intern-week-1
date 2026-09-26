# API Endpoints

## Base URL

The Angular application connects to the Laravel REST API created in Day 8.

```text
http://127.0.0.1:8000/api
```

## Facility API

| Method | Endpoint           | Purpose            |
| ------ | ------------------ | ------------------ |
| GET    | `/facilities`      | Get all facilities |
| GET    | `/facilities/{id}` | Get one facility   |
| POST   | `/facilities`      | Create a facility  |
| PUT    | `/facilities/{id}` | Update a facility  |
| DELETE | `/facilities/{id}` | Delete a facility  |

## Inspection API

| Method | Endpoint            | Purpose              |
| ------ | ------------------- | -------------------- |
| GET    | `/inspections`      | Get all inspections  |
| GET    | `/inspections/{id}` | Get one inspection   |
| POST   | `/inspections`      | Create an inspection |
| PUT    | `/inspections/{id}` | Update an inspection |
| DELETE | `/inspections/{id}` | Delete an inspection |

## Complaint API

| Method | Endpoint           | Purpose            |
| ------ | ------------------ | ------------------ |
| GET    | `/complaints`      | Get all complaints |
| GET    | `/complaints/{id}` | Get one complaint  |
| POST   | `/complaints`      | Create a complaint |
| PUT    | `/complaints/{id}` | Update a complaint |
| DELETE | `/complaints/{id}` | Delete a complaint |

## Angular Services

The Angular application uses services to communicate with the Laravel API.

### FacilityService

```text
src/app/services/facility.service.ts
```

Used for facility API requests.

### InspectionService

```text
src/app/services/inspection.service.ts
```

Used for inspection API requests.

### ComplaintService

```text
src/app/services/complaint.service.ts
```

Used for complaint API requests.

## Data Flow

```text
Angular Component
       ↓
Angular Service
       ↓
HttpClient
       ↓
Laravel REST API
       ↓
Database
       ↓
JSON Response
       ↓
Angular Component
```

## Example

When the Facilities page loads:

```text
FacilitiesComponent
       ↓
FacilityService
       ↓
GET /api/facilities
       ↓
Laravel API
       ↓
Facility data
       ↓
FacilitiesComponent
       ↓
Display in table
```

## Technologies Used

* Angular
* TypeScript
* HttpClient
* Observables
* RxJS
* Laravel REST API
* MySQL
