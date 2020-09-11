import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularLogsComponent } from './popular-logs.component';

describe('PopularLogsComponent', () => {
  let component: PopularLogsComponent;
  let fixture: ComponentFixture<PopularLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
