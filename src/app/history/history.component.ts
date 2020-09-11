import { Component, OnInit } from '@angular/core';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    history: any[] = [];
    loading: boolean = true;

    constructor(private suggestionService: SuggestionService) { }

    ngOnInit(): void {
        if(this.history.length == 0){
            this.getHistory();
        }else this.loading = false;
    }

    getHistory(): void {
        this.suggestionService.getHistory().subscribe( data => {
            this.history = data;
            this.loading = false;
        })
    }

}
