import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdLogoutComponent } from './std-logout.component';

describe('StdLogoutComponent', () => {
  let component: StdLogoutComponent;
  let fixture: ComponentFixture<StdLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StdLogoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StdLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
