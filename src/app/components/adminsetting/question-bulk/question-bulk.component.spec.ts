import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBulkComponent } from './question-bulk.component';

describe('QuestionBulkComponent', () => {
  let component: QuestionBulkComponent;
  let fixture: ComponentFixture<QuestionBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionBulkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
