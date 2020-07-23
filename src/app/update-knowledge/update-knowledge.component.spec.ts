import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKnowledgeComponent } from './update-knowledge.component';

describe('UpdateKnowledgeComponent', () => {
  let component: UpdateKnowledgeComponent;
  let fixture: ComponentFixture<UpdateKnowledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateKnowledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
