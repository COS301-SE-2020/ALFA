import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AnalysisResult } from '../analysis-result';
import { SuggestionService } from '../suggestion.service';
import { MessageService } from '../message.service';
import { first } from 'rxjs/operators';
import { Article } from '../article';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.css']
})
export class AnalysisResultComponent implements OnInit {
    @Input() analysisResult: AnalysisResult;
    @Input() index: number;
    firstSuggestion: any;

    constructor(private suggestionService: SuggestionService, private messageService: MessageService, private router: Router, private location: Location) { }

    ngOnInit(): void {
        this.analysisResult.suggestions = [];
        // console.log(this.router.);
        /* this.firstSuggestion = this.analysisResult.suggestions[0];
        this.analysisResult.suggestions = this.analysisResult.suggestions.slice(1, this.analysisResult.suggestions.length); */
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

    // emmitKbIndex(_index: number): void {
    //     this.suggestionService.emmitKbIndex(_index);
    // }

    copyToClipboard(inputElement, historyId: string){
        inputElement.value = document.location.href;
        inputElement.select();
        document.execCommand("copy");
        inputElement.setSelectionRange(0, 0);
        this.messageService.notify(`URL copied to clipboard for sharing on other platforms`);
    }
}
