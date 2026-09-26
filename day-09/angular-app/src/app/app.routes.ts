import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard.component';
import { FacilitiesComponent } from './pages/facilities.component';
import { FacilityDetailsComponent } from './pages/facility-details.component';
import { InspectionsComponent } from './pages/inspections.component';
import { InspectionFormComponent } from './pages/inspection-form.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'facilities',
    component: FacilitiesComponent
  },
  {
    path: 'facilities/:id',
    component: FacilityDetailsComponent
  },
  {
    path: 'inspections',
    component: InspectionsComponent
  },
  {
    path: 'inspections/new',
    component: InspectionFormComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
