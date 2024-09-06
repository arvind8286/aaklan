import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandlayoutComponent } from './candlayout.component';

describe('CandlayoutComponent', () => {
  let component: CandlayoutComponent;
  let fixture: ComponentFixture<CandlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandlayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
