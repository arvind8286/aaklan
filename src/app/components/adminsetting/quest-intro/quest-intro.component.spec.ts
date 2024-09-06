import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestIntroComponent } from './quest-intro.component';

describe('QuestIntroComponent', () => {
  let component: QuestIntroComponent;
  let fixture: ComponentFixture<QuestIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestIntroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
