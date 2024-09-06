import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorLoginComponent } from './assessor-login.component';

describe('AssessorLoginComponent', () => {
  let component: AssessorLoginComponent;
  let fixture: ComponentFixture<AssessorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessorLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
