import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosWiseReportComponent } from './nos-wise-report.component';

describe('NosWiseReportComponent', () => {
  let component: NosWiseReportComponent;
  let fixture: ComponentFixture<NosWiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosWiseReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NosWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
