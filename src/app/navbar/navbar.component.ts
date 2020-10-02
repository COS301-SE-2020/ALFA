import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserManService } from '../user-man.service';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isSignIn: boolean;
    isLoggedIn: boolean;

    constructor(private router: Router, private userService: UserManService, public auth: AuthService, private messageService: MessageService) {
        this.router.events.forEach(evt => {
            if (evt instanceof NavigationEnd) {
                this.isSignIn = (evt.url === '/signin');
                this.isLoggedIn = this.userService.isLoggedIn();
            }
        })
    }

    ngOnInit(): void {
    }
    signout() {
        this.userService.signout();
        this.messageService.notify(`You have signed out succesfully`);
    }
}
