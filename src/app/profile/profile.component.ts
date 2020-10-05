import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user: any;
    logfileCount: string;
    constructor(public auth: AuthService, private suggestionService: SuggestionService) { }

    ngOnInit(): void {
        this.auth.user$.subscribe( data => {
            this.user = data;
            this.suggestionService.getUserHistoryCount(this.user.email).subscribe( res => {
                if(res.length > 99){
                    this.logfileCount = `${(res.length/1000.0)}K`;
                }else if(res.length > 99999){
                    this.logfileCount = `${(res.length/1000000)}M`;
                }else{
                    this.logfileCount = res.length;
                }
            });
        });
    }

}
