import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStateComponent } from './manage-state.component';

describe('ManageStateComponent', () => {
  let component: ManageStateComponent;
  let fixture: ComponentFixture<ManageStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
