import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorpanelComponent } from './assessorpanel.component';

describe('AssessorpanelComponent', () => {
  let component: AssessorpanelComponent;
  let fixture: ComponentFixture<AssessorpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessorpanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessorpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
