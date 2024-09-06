import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandsidebarComponent } from './candsidebar.component';

describe('CandsidebarComponent', () => {
  let component: CandsidebarComponent;
  let fixture: ComponentFixture<CandsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandsidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
