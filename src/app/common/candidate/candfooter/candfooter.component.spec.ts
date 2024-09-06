import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandfooterComponent } from './candfooter.component';

describe('CandfooterComponent', () => {
  let component: CandfooterComponent;
  let fixture: ComponentFixture<CandfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandfooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
