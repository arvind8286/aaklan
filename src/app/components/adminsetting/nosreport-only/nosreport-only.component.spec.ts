import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosreportOnlyComponent } from './nosreport-only.component';

describe('NosreportOnlyComponent', () => {
  let component: NosreportOnlyComponent;
  let fixture: ComponentFixture<NosreportOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosreportOnlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NosreportOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
