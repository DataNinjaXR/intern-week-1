import { Component, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-facility-availability',
  standalone: true,
  templateUrl: './facility-availability.html',
  styleUrl: './facility-availability.css'
})
export class FacilityAvailabilityComponent implements OnChanges {

  @Input() facilityId!: number;
  @Input() selectedDate!: string;

  bookings: any[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnChanges(): void {
    if (this.facilityId && this.selectedDate) {
      this.loadAvailability();
    }
  }

  loadAvailability(): void {
    this.loading = true;
    this.error = '';

    this.http
      .get<any>(
        `http://localhost:5000/api/facilities/${this.facilityId}/availability?date=${this.selectedDate}`
      )
      .subscribe({
        next: (response) => {
          this.bookings = response.bookings || [];
          this.loading = false;
        },
        error: () => {
          this.error = 'Unable to load facility availability.';
          this.loading = false;
        }
      });
  }
}