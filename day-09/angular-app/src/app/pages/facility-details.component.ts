import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { FacilityService } from '../services/facility.service';
import { Facility } from '../models/facility.model';

@Component({
  selector: 'app-facility-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './facility-details.component.html',
  styleUrl: './facility-details.component.css'
})
export class FacilityDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private facilityService = inject(FacilityService);

  facility: Facility | null = null;

  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.loading = false;
      this.errorMessage = 'Invalid facility ID.';
      return;
    }

    this.loadFacility(id);
  }

  loadFacility(id: number): void {
    this.facilityService.getFacility(id).subscribe({
      next: (data) => {
        this.facility = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load facility details.';
      }
    });
  }
}
