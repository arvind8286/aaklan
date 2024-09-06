import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTpComponent } from './manage-tp.component';

describe('ManageTpComponent', () => {
  let component: ManageTpComponent;
  let fixture: ComponentFixture<ManageTpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageTpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
