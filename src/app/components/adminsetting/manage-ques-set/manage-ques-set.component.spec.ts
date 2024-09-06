import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuesSetComponent } from './manage-ques-set.component';

describe('ManageQuesSetComponent', () => {
  let component: ManageQuesSetComponent;
  let fixture: ComponentFixture<ManageQuesSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageQuesSetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageQuesSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
