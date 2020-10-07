import { Component, OnInit } from '@angular/core';
import { SuggestionService } from '../suggestion.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    history: any[] = [];
    loading: boolean = true;

    constructor(private suggestionService: SuggestionService, private auth: AuthService, private router: Router) { }

    ngOnInit(): void {
        if(this.history.length == 0){
            this.getHistory();
        }else this.loading = false;
    }

    getHistory(): void {
        this.auth.user$.subscribe( user => {
            if(user){
                this.suggestionService.getHistory(user.email).subscribe( data => {
                    let tmpLinks = new Set();
                    data.forEach( historyEntry => {
                        this.history.push(historyEntry.log_entries);
                    });
                    this.history.forEach( entry => {
                        entry.forEach( (e, index) => {
                            if( tmpLinks.has(e.link) ){
                                entry = entry.splice(index, 1);
                            }else{
                                tmpLinks.add(e.link);
                            }
                        });
                    });
                    this.loading = false;
                });
                return;
            }
            this.router.navigateByUrl("/");
        })
        /* this.suggestionService.getHistory().subscribe( data => {
            this.history = data;
            this.loading = false;
        })  */
    }

}
