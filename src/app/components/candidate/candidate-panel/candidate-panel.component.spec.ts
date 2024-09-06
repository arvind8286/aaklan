import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatePanelComponent } from './candidate-panel.component';

describe('CandidatePanelComponent', () => {
  let component: CandidatePanelComponent;
  let fixture: ComponentFixture<CandidatePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidatePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
