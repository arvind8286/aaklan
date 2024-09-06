import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBulkAddComponent } from './student-bulk-add.component';

describe('StudentBulkAddComponent', () => {
  let component: StudentBulkAddComponent;
  let fixture: ComponentFixture<StudentBulkAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentBulkAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentBulkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
