import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisBoardComponent } from './analysis-board.component';

describe('AnalysisBoardComponent', () => {
  let component: AnalysisBoardComponent;
  let fixture: ComponentFixture<AnalysisBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
