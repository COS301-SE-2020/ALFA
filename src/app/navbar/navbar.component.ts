import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserManService } from '../user-man.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isSignIn: boolean;
    isLoggedIn: boolean;

    constructor(private router: Router, private userService: UserManService) {
        this.router.events.forEach( evt => {
                if(evt instanceof NavigationEnd){
                    this.isSignIn = (evt.url === '/signin');
                    this.isLoggedIn = this.userService.isLoggedIn();
                }
        })
    }

    ngOnInit(): void {
    }
    signout(){
        this.userService.signout();
    }
}
