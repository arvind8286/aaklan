import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJobroleComponent } from './manage-jobrole.component';

describe('ManageJobroleComponent', () => {
  let component: ManageJobroleComponent;
  let fixture: ComponentFixture<ManageJobroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageJobroleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageJobroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
