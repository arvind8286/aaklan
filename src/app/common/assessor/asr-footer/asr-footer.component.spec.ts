import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsrFooterComponent } from './asr-footer.component';

describe('AsrFooterComponent', () => {
  let component: AsrFooterComponent;
  let fixture: ComponentFixture<AsrFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsrFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsrFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
