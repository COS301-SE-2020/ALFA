import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionBoxComponent } from './suggestion-box.component';
import { HttpClientModule } from '@angular/common/http';

import {MessageComponent} from '../message/message.component'
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

describe('SuggestionBoxComponent', () => {
  let component: SuggestionBoxComponent;
  let fixture: ComponentFixture<SuggestionBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionBoxComponent ],
      imports: [HttpClientModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test form validify', ()=>{
      const form = component.form;
      expect(form.valid).toBeFalsy();

      const linkInput = form.controls.link;
      linkInput.setValue('https://stackoverflow.com/questions/47511736/how-to-test-forms-with-jasmine');

      const descriptionInput = form.controls.description;
      descriptionInput.setValue('How to test forms with Jasmine');

      expect(form.valid).toBeTruthy();
  });

  it('should test input validity', () => {
    const linkInput = component.form.controls.link;
    const descriptionInput = component.form.controls.description;

    expect(linkInput.valid).toBeFalsy();
    expect(descriptionInput.valid).toBeFalsy();

    linkInput.setValue('https://stackoverflow.com/questions/47511736/how-to-test-forms-with-jasmine');
    descriptionInput.setValue('How to test forms with Jasmine');

    expect(linkInput.valid).toBeTruthy();
    expect(descriptionInput.valid).toBeTruthy();
  });

  it('should submit suggestion', () => {
    component.form.controls.link.setValue('https://stackoverflow.com/questions/47511736/how-to-test-forms-with-jasmine');
    component.form.controls.description.setValue('How to test forms with Jasmine')

    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    expect(MessageComponent).toBeTruthy();
  });


});
