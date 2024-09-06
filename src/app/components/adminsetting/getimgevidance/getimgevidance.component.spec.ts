import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetimgevidanceComponent } from './getimgevidance.component';

describe('GetimgevidanceComponent', () => {
  let component: GetimgevidanceComponent;
  let fixture: ComponentFixture<GetimgevidanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetimgevidanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetimgevidanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
