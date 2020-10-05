import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AnalysisResult } from '../analysis-result';
import { SuggestionService } from '../suggestion.service';
import { MessageService } from '../message.service';
import { first } from 'rxjs/operators';
import { Article } from '../article';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { UpdateKnowledgeComponent } from '../update-knowledge/update-knowledge.component';

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
    toggleSuggestionsId: string;
    
    constructor(private suggestionService: SuggestionService, private messageService: MessageService, private router: ActivatedRoute, private auth: AuthService) { }
    
    ngOnInit(): void {
        this.analysisResult.suggestions = [];
        this.toggleSuggestionsId = btoa(this.analysisResult.link).substr(0, this.analysisResult.link.length/2);
        // get suggestions
        // console.log(this.analysisResult);
        this.suggestionService.getSuggestions(this.analysisResult.link).subscribe( res => {
            if(res && res.suggestions){
                this.analysisResult.suggestions = res.suggestions.slice(1, res.suggestions.length);
            }
        });

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
        this.suggestionService.vote(_link, 1).subscribe( () => {});
        this.updateVotes(_link, 1);
    }

    formatVoteCount(votes: number): string{
        if(votes > 99){
            return `${votes/1000}K`;
        }else if(votes > 99999){
            return `${votes/1000000}M`;
        }
        return `${votes}`
    }
    
    downVote(_link: string): void {
        this.suggestionService.vote(_link, -1).subscribe( () => {});
        this.updateVotes(_link, -1);
    }

    emmitParentLink(_link: string): void {
        this.suggestionService.emmitParentLink(_link);
    }

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

    updateVotes(_link: string, voteCount: number){
        if(_link === this.analysisResult.link){
            this.analysisResult.votes += voteCount;
        }else{
            this.analysisResult.suggestions.forEach( suggestion => {
                if(suggestion.link === _link){
                    suggestion.votes += voteCount;
                    return;
                }
            })
        }
    }
}
