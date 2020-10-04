import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AnalysisResult } from '../analysis-result';
import { SuggestionService } from '../suggestion.service';
import { MessageService } from '../message.service';
import { first } from 'rxjs/operators';
import { Article } from '../article';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.css']
})
export class AnalysisResultComponent implements OnInit {
    @Input() analysisResult: AnalysisResult;
    @Input() index: number;
    firstSuggestion: any;
    shareUrl: string;

    constructor(private suggestionService: SuggestionService, private messageService: MessageService, private router: ActivatedRoute, private auth: AuthService) { }

    ngOnInit(): void {
        this.analysisResult.suggestions = [];
        
        this.auth.user$.subscribe( user => {
            if(user){
                this.router.params.subscribe( ps => {
                    if(ps && (ps.email && ps.url)){
                        this.shareUrl = document.location.href;
                    }
                    else {
                        this.shareUrl = `${document.location.origin}/history/${btoa(user.email).split("=")[0]}/${btoa(this.analysisResult.link)}`;
                    }
                });
            }
        })
        /* this.firstSuggestion = this.analysisResult.suggestions[0];
        this.analysisResult.suggestions = this.analysisResult.suggestions.slice(1, this.analysisResult.suggestions.length); */
    }

    upVote(_link: string): void {
        this.suggestionService.vote(_link, 1).subscribe( msg => {
            console.log(msg);
        });
    }
    
    downVote(_link: string): void {
        this.suggestionService.vote(_link, -1).subscribe( msg => {
            console.log(msg);
        });
    }

    // emmitKbIndex(_index: number): void {
    //     this.suggestionService.emmitKbIndex(_index);
    // }

    whatsappShare(evt){
        this.auth.user$.subscribe( user=> {
            if(!user){
                evt.preventDefault();
                this.messageService.notify(`This functionality is only available for signed in users`);
            }
        })
    }

    copyToClipboard(inputElement){
        this.auth.user$.subscribe( user => {
            if(user){
                inputElement.value = this.shareUrl;
                inputElement.select();
                document.execCommand("copy");
                inputElement.setSelectionRange(0, 0);
                this.messageService.notify(`URL copied to clipboard for sharing on other platforms`);
                return;
            }
            this.messageService.notify(`This functionality is only available for signed in users`);
        });
    }
}
