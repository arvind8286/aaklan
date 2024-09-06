import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchWiseComponent } from './batch-wise.component';

describe('BatchWiseComponent', () => {
  let component: BatchWiseComponent;
  let fixture: ComponentFixture<BatchWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchWiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BatchWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
