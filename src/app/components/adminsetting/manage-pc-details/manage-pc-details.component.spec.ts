import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePcDetailsComponent } from './manage-pc-details.component';

describe('ManagePcDetailsComponent', () => {
  let component: ManagePcDetailsComponent;
  let fixture: ComponentFixture<ManagePcDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePcDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagePcDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
