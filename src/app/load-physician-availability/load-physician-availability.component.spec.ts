import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPhysicianAvailabilityComponent } from './load-physician-availability.component';

describe('LoadPhysicianAvailabilityComponent', () => {
  let component: LoadPhysicianAvailabilityComponent;
  let fixture: ComponentFixture<LoadPhysicianAvailabilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadPhysicianAvailabilityComponent]
    });
    fixture = TestBed.createComponent(LoadPhysicianAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
