import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulerEvaluationComponent } from './ruler-evaluation.component';

describe('RulerEvaluationComponent', () => {
  let component: RulerEvaluationComponent;
  let fixture: ComponentFixture<RulerEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulerEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulerEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
