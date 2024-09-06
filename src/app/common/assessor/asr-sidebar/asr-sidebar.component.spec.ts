import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsrSidebarComponent } from './asr-sidebar.component';

describe('AsrSidebarComponent', () => {
  let component: AsrSidebarComponent;
  let fixture: ComponentFixture<AsrSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsrSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsrSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
