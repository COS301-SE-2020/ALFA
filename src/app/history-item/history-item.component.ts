import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AnalysisResult } from '../analysis-result';
import { MessageService } from '../message.service';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.css']
})
export class HistoryItemComponent implements OnInit {
    url: string;
    email: string;
    historyItem: AnalysisResult;
    loading: boolean = true;

    constructor(private router: Router, private activeRoute: ActivatedRoute, private suggestionService: SuggestionService, private messageService: MessageService) { }

    ngOnInit(): void {
        this.activeRoute.params.subscribe( params => {
            this.url = params.url;
            this.email = atob(params.email);

            this.getHistoryItem();
        });
    }
    
    getHistoryItem(): any{
        this.suggestionService.getHistoryItem(this.email, this.url).subscribe( data =>{
            if(!data){
                this.messageService.notify("The resource you requested was not found, you will be redirected to our home page");
                this.router.navigateByUrl("/");
                return;
            }
            this.historyItem = data[0].log_entries[0];
            this.loading = false;
        })
    }

}
