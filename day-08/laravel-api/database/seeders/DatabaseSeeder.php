<?php

namespace Database\Seeders;

use App\Models\Complaint;
use App\Models\Department;
use App\Models\Employee;
use App\Models\Facility;
use App\Models\Inspection;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Default Admin User
        User::firstOrCreate(
            ['email' => 'admin@facility.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Create Departments
        $deptOps = Department::create([
            'name' => 'Operations',
            'description' => 'Manages daily facility operations, scheduling, and logistics.',
        ]);

        $deptMaint = Department::create([
            'name' => 'Maintenance',
            'description' => 'Handles equipment repairs, HVAC servicing, and structure maintenance.',
        ]);

        $deptSafety = Department::create([
            'name' => 'Health & Safety',
            'description' => 'Ensures environmental safety compliance and risk assessments.',
        ]);

        $deptAdmin = Department::create([
            'name' => 'Administration',
            'description' => 'Oversees facility management, budgeting, and general administration.',
        ]);

        // 3. Create Employees
        $employeesData = [
            ['department_id' => $deptOps->id, 'name' => 'Sarah Jenkins', 'email' => 'sarah.j@facility.com', 'position' => 'Operations Director', 'salary' => 115000.00],
            ['department_id' => $deptOps->id, 'name' => 'Michael Chang', 'email' => 'michael.c@facility.com', 'position' => 'Logistics Coordinator', 'salary' => 68000.00],
            ['department_id' => $deptOps->id, 'name' => 'David Ross', 'email' => 'david.r@facility.com', 'position' => 'Floor Supervisor', 'salary' => 62000.00],

            ['department_id' => $deptMaint->id, 'name' => 'Robert Miller', 'email' => 'robert.m@facility.com', 'position' => 'Chief Engineer', 'salary' => 105000.00],
            ['department_id' => $deptMaint->id, 'name' => 'James Wilson', 'email' => 'james.w@facility.com', 'position' => 'HVAC Technician', 'salary' => 58000.00],
            ['department_id' => $deptMaint->id, 'name' => 'Carlos Gomez', 'email' => 'carlos.g@facility.com', 'position' => 'Electrician', 'salary' => 64000.00],
            ['department_id' => $deptMaint->id, 'name' => 'Anna Kowalski', 'email' => 'anna.k@facility.com', 'position' => 'Plumbing Specialist', 'salary' => 60000.00],

            ['department_id' => $deptSafety->id, 'name' => 'Dr. Elena Rostova', 'email' => 'elena.r@facility.com', 'position' => 'Safety Officer', 'salary' => 95000.00],
            ['department_id' => $deptSafety->id, 'name' => 'Kevin Patel', 'email' => 'kevin.p@facility.com', 'position' => 'Environmental Inspector', 'salary' => 72000.00],

            ['department_id' => $deptAdmin->id, 'name' => 'Amanda Lewis', 'email' => 'amanda.l@facility.com', 'position' => 'General Manager', 'salary' => 125000.00],
            ['department_id' => $deptAdmin->id, 'name' => 'Brian Taylor', 'email' => 'brian.t@facility.com', 'position' => 'Facility Analyst', 'salary' => 78000.00],
            ['department_id' => $deptAdmin->id, 'name' => 'Rachel Adams', 'email' => 'rachel.a@facility.com', 'position' => 'Office Administrator', 'salary' => 55000.00],
        ];

        foreach ($employeesData as $emp) {
            Employee::create($emp);
        }

        // 4. Create Facilities
        $facMain = Facility::create([
            'name' => 'Main HQ Tower',
            'location' => 'Building A, Downtown Plaza',
            'type' => 'Office Building',
            'status' => 'Good',
            'description' => '12-story primary corporate headquarters building with modern amenities.',
        ]);

        $facLab = Facility::create([
            'name' => 'West Wing Research Lab',
            'location' => 'Building B, Science Park',
            'type' => 'Laboratory',
            'status' => 'Average',
            'description' => 'High-tech testing laboratory with specialized ventilation requirements.',
        ]);

        $facWhse = Facility::create([
            'name' => 'Central Logistics Depot',
            'location' => 'Zone 4, Industrial Logistics Center',
            'type' => 'Warehouse',
            'status' => 'Poor',
            'description' => 'Heavy distribution warehouse experiencing roof leakage and pavement degradation.',
        ]);

        $facGar = Facility::create([
            'name' => 'North Multi-Level Parking',
            'location' => 'North Campus Perimeter',
            'type' => 'Parking Structure',
            'status' => 'Critical',
            'description' => '4-level concrete garage with structural concrete cracking and lighting failures.',
        ]);

        $facCafe = Facility::create([
            'name' => 'East Campus Cafeteria',
            'location' => 'Building C, Ground Level',
            'type' => 'Dining Facility',
            'status' => 'Good',
            'description' => 'Commercial kitchen and dining hall serving over 800 employees daily.',
        ]);

        $facData = Facility::create([
            'name' => 'Tech Server & Data Hub',
            'location' => 'Sub-Basement, HQ Complex',
            'type' => 'Data Center',
            'status' => 'Good',
            'description' => 'Climate-controlled server environment with redundant UPS power backup.',
        ]);

        $facAnnex = Facility::create([
            'name' => 'South Equipment Annex',
            'location' => 'South Field Compound',
            'type' => 'Storage Facility',
            'status' => 'Poor',
            'description' => 'Auxiliary equipment shed requiring electrical panel upgrades and pest control.',
        ]);

        // 5. Create Inspections
        $inspectionsData = [
            [
                'facility_id' => $facMain->id,
                'inspector_name' => 'Kevin Patel',
                'inspection_date' => '2026-08-10',
                'condition' => 'Good',
                'remarks' => 'HVAC operating efficiently. Emergency exits clear and properly illuminated.',
            ],
            [
                'facility_id' => $facMain->id,
                'inspector_name' => 'Dr. Elena Rostova',
                'inspection_date' => '2026-09-15',
                'condition' => 'Good',
                'remarks' => 'Fire extinguishers inspected and certified. Elevators functioning normally.',
            ],
            [
                'facility_id' => $facLab->id,
                'inspector_name' => 'Kevin Patel',
                'inspection_date' => '2026-08-18',
                'condition' => 'Average',
                'remarks' => 'Fume hood #3 needs filter replacement. Eyewash stations checked.',
            ],
            [
                'facility_id' => $facLab->id,
                'inspector_name' => 'Dr. Elena Rostova',
                'inspection_date' => '2026-09-20',
                'condition' => 'Average',
                'remarks' => 'Chemical storage room temperature slightly elevated. Secondary containment intact.',
            ],
            [
                'facility_id' => $facWhse->id,
                'inspector_name' => 'Robert Miller',
                'inspection_date' => '2026-07-25',
                'condition' => 'Poor',
                'remarks' => 'Roof membrane leaking near loading bay 2. Forklift charging station wiring worn.',
            ],
            [
                'facility_id' => $facWhse->id,
                'inspector_name' => 'Kevin Patel',
                'inspection_date' => '2026-09-02',
                'condition' => 'Poor',
                'remarks' => 'Water damage noted on pallet rack aisle 4. Repairs pending contractor approval.',
            ],
            [
                'facility_id' => $facGar->id,
                'inspector_name' => 'Robert Miller',
                'inspection_date' => '2026-08-01',
                'condition' => 'Critical',
                'remarks' => 'Concrete spalling on Level 3 ramp. 12 overhead lights burned out causing dark spots.',
            ],
            [
                'facility_id' => $facGar->id,
                'inspector_name' => 'Dr. Elena Rostova',
                'inspection_date' => '2026-09-10',
                'condition' => 'Critical',
                'remarks' => 'Urgent structural engineering review recommended for Level 2 support column.',
            ],
            [
                'facility_id' => $facCafe->id,
                'inspector_name' => 'Kevin Patel',
                'inspection_date' => '2026-09-05',
                'condition' => 'Good',
                'remarks' => 'Kitchen sanitation standards met. Grease trap serviced recently.',
            ],
            [
                'facility_id' => $facData->id,
                'inspector_name' => 'James Wilson',
                'inspection_date' => '2026-09-12',
                'condition' => 'Good',
                'remarks' => 'CRAC cooling units functioning at optimal delta-T. Halon fire suppression armed.',
            ],
            [
                'facility_id' => $facAnnex->id,
                'inspector_name' => 'Carlos Gomez',
                'inspection_date' => '2026-08-30',
                'condition' => 'Poor',
                'remarks' => 'Main breaker box shows corrosion. Exterior door weather stripping missing.',
            ],
            [
                'facility_id' => $facAnnex->id,
                'inspector_name' => 'Robert Miller',
                'inspection_date' => '2026-09-18',
                'condition' => 'Poor',
                'remarks' => 'Severe moisture accumulation on north wall. Temporary dehumidifier deployed.',
            ],
        ];

        foreach ($inspectionsData as $insp) {
            Inspection::create($insp);
        }

        // 6. Create Complaints
        $complaintsData = [
            [
                'facility_id' => $facGar->id,
                'title' => 'Severe ramp concrete cracking',
                'description' => 'Deep structural cracks visible on the Level 3 access ramp posing safety risks.',
                'status' => 'Open',
                'priority' => 'Critical',
            ],
            [
                'facility_id' => $facGar->id,
                'title' => 'Dark stairwells due to blown bulbs',
                'description' => 'Multiple stairwell light fixtures out on Levels 2 and 4, creating hazards at night.',
                'status' => 'In Progress',
                'priority' => 'High',
            ],
            [
                'facility_id' => $facGar->id,
                'title' => 'Broken barrier gate at exit',
                'description' => 'Automatic gate arm stuck in raised position, allowing unauthorized parking.',
                'status' => 'Resolved',
                'priority' => 'Medium',
            ],
            [
                'facility_id' => $facWhse->id,
                'title' => 'Active roof leak during heavy rain',
                'description' => 'Water dripping onto electronics inventory near loading dock bay 2.',
                'status' => 'Open',
                'priority' => 'Critical',
            ],
            [
                'facility_id' => $facWhse->id,
                'title' => 'Loading dock door roller jammed',
                'description' => 'Bay door #4 cannot close completely, exposing warehouse to outside temperature.',
                'status' => 'In Progress',
                'priority' => 'High',
            ],
            [
                'facility_id' => $facWhse->id,
                'title' => 'Uneven concrete flooring in aisle 6',
                'description' => 'Forklifts experiencing heavy bumps when carrying loaded pallets.',
                'status' => 'Open',
                'priority' => 'Medium',
            ],
            [
                'facility_id' => $facLab->id,
                'title' => 'Exhaust hood #3 airflow warning',
                'description' => 'Airflow velocity sensor intermittently alarms during chemical preparation.',
                'status' => 'In Progress',
                'priority' => 'High',
            ],
            [
                'facility_id' => $facLab->id,
                'title' => 'Temperature fluctuation in chemical storage',
                'description' => 'Room ambient temperature exceeds 24°C during afternoon peak hours.',
                'status' => 'Open',
                'priority' => 'Medium',
            ],
            [
                'facility_id' => $facMain->id,
                'title' => 'Air conditioning weak on 8th Floor',
                'description' => 'Occupants reporting warm office temperatures above 26°C.',
                'status' => 'Resolved',
                'priority' => 'Low',
            ],
            [
                'facility_id' => $facMain->id,
                'title' => 'Restroom flush valve leaking',
                'description' => 'Continuous water flow in 5th floor mens restroom valve assembly.',
                'status' => 'Resolved',
                'priority' => 'Low',
            ],
            [
                'facility_id' => $facCafe->id,
                'title' => 'Walk-in freezer temperature alarm',
                'description' => 'Secondary freezer unit compressor making grinding noise.',
                'status' => 'In Progress',
                'priority' => 'High',
            ],
            [
                'facility_id' => $facAnnex->id,
                'title' => 'Rodent activity observed near storage crates',
                'description' => 'Signs of pest infestation detected behind cardboard storage racks.',
                'status' => 'Open',
                'priority' => 'Medium',
            ],
        ];

        foreach ($complaintsData as $cmp) {
            Complaint::create($cmp);
        }
    }
}
