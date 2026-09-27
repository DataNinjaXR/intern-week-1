import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FacilityAvailabilityComponent } from './facility-availability/facility-availability';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, FacilityAvailabilityComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Campus Facility Availability Checker');

  facilityId = 1;
  selectedDate = '';

  readonly facilityOptions = [
    { id: 1, name: 'Computer Lab 1' },
    { id: 2, name: 'Seminar Hall' },
    { id: 3, name: 'Smart Classroom 101' },
    { id: 4, name: 'Conference Room' },
    { id: 5, name: 'Auditorium' },
    { id: 6, name: 'Sports Complex' },
  ];

  setToday(): void {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0];
  }
}
