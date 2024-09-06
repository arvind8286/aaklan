import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsrLayoutComponent } from './asr-layout.component';

describe('AsrLayoutComponent', () => {
  let component: AsrLayoutComponent;
  let fixture: ComponentFixture<AsrLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsrLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsrLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
