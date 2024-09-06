import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdReportComponent } from './std-report.component';

describe('StdReportComponent', () => {
  let component: StdReportComponent;
  let fixture: ComponentFixture<StdReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StdReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StdReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
