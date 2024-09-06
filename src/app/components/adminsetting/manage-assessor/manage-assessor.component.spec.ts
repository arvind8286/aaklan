import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssessorComponent } from './manage-assessor.component';

describe('ManageAssessorComponent', () => {
  let component: ManageAssessorComponent;
  let fixture: ComponentFixture<ManageAssessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAssessorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAssessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
