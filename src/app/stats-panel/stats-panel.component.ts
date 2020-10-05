import { Component, OnInit } from '@angular/core';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-stats-panel',
  templateUrl: './stats-panel.component.html',
  styleUrls: ['./stats-panel.component.css']
})
export class StatsPanelComponent implements OnInit {
    logfileCount: string;

    constructor(private suggestionService: SuggestionService) { }

    ngOnInit(): void {
        this.suggestionService.getHistoryCount().subscribe( data => {
            data.count *= 10;
            if(data.count > 99){
                this.logfileCount = `${(data.count/1000.0)}K`;
            }else if(data.count > 99999){
                this.logfileCount = `${(data.count/1000000)}M`;
            }else{
                this.logfileCount = data.count;
            }
        });
    }

}
