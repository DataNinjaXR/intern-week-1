import { Component, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilityService } from '../services/facility.service';
import { InspectionService } from '../services/inspection.service';

import { Facility } from '../models/facility.model';
import { Inspection } from '../models/inspection.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  private facilityService = inject(FacilityService);
  private inspectionService = inject(InspectionService);
  private changeDetector = inject(ChangeDetectorRef);

  facilities: Facility[] = [];
  inspections: Inspection[] = [];

  totalFacilities = 0;
  totalInspections = 0;
  averageScore = 0;
  goodFacilities = 0;

  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.errorMessage = '';

    this.facilityService.getFacilities().subscribe({
      next: (data: Facility[]) => {
        console.log('Facilities received:', data);

        this.facilities = data;
        this.totalFacilities = data.length;

        this.goodFacilities = data.filter(
          facility =>
            facility.status &&
            facility.status.toLowerCase() === 'good'
        ).length;

        this.loadInspections();
        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error('Facility API error:', error);

        this.loading = false;
        this.errorMessage = 'Unable to load facility data.';

        this.changeDetector.detectChanges();
      }
    });
  }

  loadInspections(): void {
    this.inspectionService.getInspections().subscribe({
      next: (data: Inspection[]) => {
        console.log('Inspections received:', data);

        this.inspections = data;
        this.totalInspections = data.length;

        if (data.length > 0) {
          const total = data.reduce(
            (sum, inspection) =>
              sum + Number(inspection.score),
            0
          );

          this.averageScore = Number(
            (total / data.length).toFixed(2)
          );
        } else {
          this.averageScore = 0;
        }

        this.loading = false;

        console.log('Dashboard loading completed.');

        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error('Inspection API error:', error);

        this.loading = false;
        this.errorMessage = 'Unable to load inspection data.';

        this.changeDetector.detectChanges();
      }
    });
  }
}
