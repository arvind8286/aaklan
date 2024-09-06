import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VivaQuestionComponent } from './viva-question.component';

describe('VivaQuestionComponent', () => {
  let component: VivaQuestionComponent;
  let fixture: ComponentFixture<VivaQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VivaQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VivaQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
