import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNosDetailsComponent } from './manage-nos-details.component';

describe('ManageNosDetailsComponent', () => {
  let component: ManageNosDetailsComponent;
  let fixture: ComponentFixture<ManageNosDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageNosDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageNosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
