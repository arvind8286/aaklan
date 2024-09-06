import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforetestComponent } from './beforetest.component';

describe('BeforetestComponent', () => {
  let component: BeforetestComponent;
  let fixture: ComponentFixture<BeforetestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeforetestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeforetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
