import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {By} from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('it should contain Home link', () => {
    const links = fixture.debugElement.nativeElement.querySelectorAll('.nav-item');
    const homeLink = links[0];
    expect(homeLink.innerHTML).toContain('Home');
  });
  it('it should contain How it works link', () => {
    const links = fixture.debugElement.nativeElement.querySelectorAll('.nav-item');
    const homeLink = links[1];
    expect(homeLink.innerHTML).toContain('How it Works');
  });
  it('it should contain Analysis History link', () => {
    const links = fixture.debugElement.nativeElement.querySelectorAll('.nav-item');
    const homeLink = links[2];
    expect(homeLink.innerHTML).toContain('Analysis History');
  });
});
