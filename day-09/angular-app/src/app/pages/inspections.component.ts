import { Component, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionService } from '../services/inspection.service';
import { Inspection } from '../models/inspection.model';

@Component({
  selector: 'app-inspections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inspections.component.html',
  styleUrl: './inspections.component.css'
})
export class InspectionsComponent implements OnInit {

  private inspectionService = inject(InspectionService);
  private changeDetector = inject(ChangeDetectorRef);

  inspections: Inspection[] = [];

  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadInspections();
  }

  loadInspections(): void {
    this.loading = true;
    this.errorMessage = '';

    this.inspectionService.getInspections().subscribe({
      next: (data: Inspection[]) => {
        console.log('Inspections received:', data);

        this.inspections = data;
        this.loading = false;

        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error('Inspection API error:', error);

        this.loading = false;
        this.errorMessage = 'Unable to load inspection history.';

        this.changeDetector.detectChanges();
      }
    });
  }

  getScoreClass(score: number): string {
    if (score >= 8) {
      return 'good';
    }

    if (score >= 5) {
      return 'average';
    }

    return 'poor';
  }
}
