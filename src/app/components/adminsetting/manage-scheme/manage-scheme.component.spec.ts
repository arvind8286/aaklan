import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSchemeComponent } from './manage-scheme.component';

describe('ManageSchemeComponent', () => {
  let component: ManageSchemeComponent;
  let fixture: ComponentFixture<ManageSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSchemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
