import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNosElementsComponent } from './manage-nos-elements.component';

describe('ManageNosElementsComponent', () => {
  let component: ManageNosElementsComponent;
  let fixture: ComponentFixture<ManageNosElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageNosElementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageNosElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
