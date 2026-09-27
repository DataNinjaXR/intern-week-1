import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityAvailability } from './facility-availability';

describe('FacilityAvailability', () => {
  let component: FacilityAvailability;
  let fixture: ComponentFixture<FacilityAvailability>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityAvailability]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityAvailability);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
