import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user: any;
    constructor(public auth: AuthService) { }

    ngOnInit(): void {
        this.auth.user$.subscribe( data => {
            this.user = data;
        });
    }

}
