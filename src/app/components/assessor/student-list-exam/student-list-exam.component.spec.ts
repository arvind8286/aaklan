import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListExamComponent } from './student-list-exam.component';

describe('StudentListExamComponent', () => {
  let component: StudentListExamComponent;
  let fixture: ComponentFixture<StudentListExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentListExamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentListExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
