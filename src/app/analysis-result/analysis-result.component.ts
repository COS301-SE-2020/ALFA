import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AnalysisResult } from '../analysis-result';
import { SuggestionService } from '../suggestion.service';
import { MessageService } from '../message.service';
import { first } from 'rxjs/operators';
import { Article } from '../article';

@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.css']
})
export class AnalysisResultComponent implements OnInit {
    @Input() analysisResult: AnalysisResult;
    firstSuggestion: Article;

    constructor(private suggestionService: SuggestionService) { }

    ngOnInit(): void {
        this.firstSuggestion = this.analysisResult.suggestions[0];
        this.analysisResult.suggestions = this.analysisResult.suggestions.slice(1, this.analysisResult.suggestions.length);
    }

    upVote(_index: number, _id: string): void {
        this.suggestionService.vote(_index, _id, 1).subscribe( msg => {
            console.log(msg);
        });
    }
    
    downVote(_index: number, _id: string): void {
        this.suggestionService.vote(_index, _id, -1).subscribe( msg => {
            console.log(msg);
        });
    }

    emmitKbIndex(_index: number): void {
        this.suggestionService.emmitKbIndex(_index);
    }
}
