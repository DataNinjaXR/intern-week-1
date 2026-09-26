import { Component, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { FacilityService } from '../services/facility.service';
import { Facility } from '../models/facility.model';

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.css'
})
export class FacilitiesComponent implements OnInit {

  private facilityService = inject(FacilityService);
  private changeDetector = inject(ChangeDetectorRef);

  facilities: Facility[] = [];
  filteredFacilities: Facility[] = [];

  searchText = '';
  selectedStatus = 'All';
  sortOption = 'name';

  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadFacilities();
  }

  loadFacilities(): void {
    this.loading = true;
    this.errorMessage = '';

    this.facilityService.getFacilities().subscribe({
      next: (data: Facility[]) => {
        console.log('Facilities received:', data);

        this.facilities = data;
        this.filteredFacilities = [...data];

        this.applyFilters();

        this.loading = false;

        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error('Facility API error:', error);

        this.loading = false;
        this.errorMessage = 'Unable to load facilities from the API.';

        this.changeDetector.detectChanges();
      }
    });
  }

  applyFilters(): void {
    let result = [...this.facilities];

    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();

      result = result.filter(facility =>
        facility.name.toLowerCase().includes(search) ||
        facility.location.toLowerCase().includes(search)
      );
    }

    if (this.selectedStatus !== 'All') {
      result = result.filter(
        facility =>
          facility.status.toLowerCase() ===
          this.selectedStatus.toLowerCase()
      );
    }

    if (this.sortOption === 'name') {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (this.sortOption === 'score-high') {
      result.sort(
        (a, b) =>
          Number(b.cleanliness_score ?? 0) -
          Number(a.cleanliness_score ?? 0)
      );
    }

    if (this.sortOption === 'score-low') {
      result.sort(
        (a, b) =>
          Number(a.cleanliness_score ?? 0) -
          Number(b.cleanliness_score ?? 0)
      );
    }

    this.filteredFacilities = result;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedStatus = 'All';
    this.sortOption = 'name';

    this.applyFilters();
  }
}
