import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Inspection } from '../models/inspection.model';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/api/inspections';

  getInspections(): Observable<Inspection[]> {
    return this.http.get<Inspection[]>(this.apiUrl);
  }

  getInspection(id: number): Observable<Inspection> {
    return this.http.get<Inspection>(`${this.apiUrl}/${id}`);
  }

  createInspection(
    inspection: Omit<Inspection, 'id' | 'created_at' | 'updated_at'>
  ): Observable<Inspection> {
    return this.http.post<Inspection>(this.apiUrl, inspection);
  }

  updateInspection(
    id: number,
    inspection: Inspection
  ): Observable<Inspection> {
    return this.http.put<Inspection>(
      `${this.apiUrl}/${id}`,
      inspection
    );
  }

  deleteInspection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
