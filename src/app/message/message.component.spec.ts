import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageComponent } from './message.component';

import { By } from '@angular/platform-browser';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have warning message', ()=>{
  //    expect(component.message).toBeUndefined()
     
  //    const messageBox = fixture.debugElement.nativeElement.querySelector('.card-body');
  //    expect(messageBox.innerHTML).not.toBeNull()

  // })

  // it('should have "OKAY" Button', () => {
  //   const btn = fixture.debugElement.nativeElement.querySelector('button.btn-link')
  //   expect(btn.innerHTML).toBe('OKAY')
  // })

  // it('should set "show" to false when "OKAY" button is clicked', ()=>{
  //   //initiaally it is set to false. it will then change inside "ngInit"
  //   expect(component.show).toBe(false)
    
  //   const btn = fixture.debugElement.nativeElement.querySelector('.btn-link')
  //   btn.click()

  //   expect(component.show).toBe(false)
  // })

});
