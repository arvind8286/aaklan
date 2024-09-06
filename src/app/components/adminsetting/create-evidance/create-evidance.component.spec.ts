import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvidanceComponent } from './create-evidance.component';

describe('CreateEvidanceComponent', () => {
  let component: CreateEvidanceComponent;
  let fixture: ComponentFixture<CreateEvidanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEvidanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEvidanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
