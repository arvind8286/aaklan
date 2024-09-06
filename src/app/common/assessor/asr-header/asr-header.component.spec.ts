import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsrHeaderComponent } from './asr-header.component';

describe('AsrHeaderComponent', () => {
  let component: AsrHeaderComponent;
  let fixture: ComponentFixture<AsrHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsrHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsrHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
