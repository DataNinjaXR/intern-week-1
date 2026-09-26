import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { InspectionService } from '../services/inspection.service';
import { FacilityService } from '../services/facility.service';
import { Facility } from '../models/facility.model';

@Component({
  selector: 'app-inspection-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inspection-form.component.html',
  styleUrl: './inspection-form.component.css'
})
export class InspectionFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private inspectionService = inject(InspectionService);
  private facilityService = inject(FacilityService);

  facilities: Facility[] = [];

  loadingFacilities = true;
  submitting = false;

  successMessage = '';
  errorMessage = '';

  inspectionForm = this.fb.nonNullable.group({
    facility_id: [0, [Validators.required, Validators.min(1)]],
    inspector_name: ['', [Validators.required, Validators.minLength(2)]],
    inspection_date: ['', Validators.required],
    score: [0, [
      Validators.required,
      Validators.min(0),
      Validators.max(10)
    ]],
    remarks: ['', [Validators.required, Validators.minLength(5)]]
  });

  ngOnInit(): void {
    this.loadFacilities();
  }

  loadFacilities(): void {
    this.facilityService.getFacilities().subscribe({
      next: (data) => {
        this.facilities = data;
        this.loadingFacilities = false;
      },
      error: () => {
        this.loadingFacilities = false;
        this.errorMessage = 'Unable to load facilities.';
      }
    });
  }

  submitForm(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.inspectionForm.invalid) {
      this.inspectionForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    this.inspectionService
      .createInspection(this.inspectionForm.getRawValue())
      .subscribe({
        next: () => {
          this.submitting = false;
          this.successMessage = 'Inspection created successfully.';

          this.inspectionForm.reset({
            facility_id: 0,
            inspector_name: '',
            inspection_date: '',
            score: 0,
            remarks: ''
          });
        },
        error: () => {
          this.submitting = false;
          this.errorMessage = 'Unable to create inspection.';
        }
      });
  }

  goToHistory(): void {
    this.router.navigate(['/inspections']);
  }
}
