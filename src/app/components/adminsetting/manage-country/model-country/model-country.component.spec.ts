import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCountryComponent } from './model-country.component';

describe('ModelCountryComponent', () => {
  let component: ModelCountryComponent;
  let fixture: ComponentFixture<ModelCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
