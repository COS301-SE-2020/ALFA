import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from '../message.service';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-suggestion-box',
  templateUrl: './suggestion-box.component.html',
  styleUrls: ['./suggestion-box.component.css']
})
export class SuggestionBoxComponent implements OnInit {
    form = new FormGroup({
        link: new FormControl(''),
        description: new FormControl('')
    });
    parent_link: string;

    constructor(private suggestionService: SuggestionService, private messageService: MessageService) { }

    ngOnInit(): void {
        // this.suggestionService.indexEmmiter.subscribe( data =>{
        //     this.kb_index = data;
        //     console.log(`Emmiting index ${this.kb_index}`);
        // });
        this.suggestionService.linkEmitter.subscribe( data => {
            this.parent_link = data;
        });
    }

    addSuggestion(): void {
        if(this.form.controls.link.status != "VALID"){
            this.messageService.notify("Please provide a valid url for the 'Resource URL' field");
            return;
        }
        if(this.form.controls.description.status != "VALID"){
            this.messageService.notify("Resource title is required, please make sure you fill in the 'Resource Title' field");
            return;
        }

        this.suggestionService.addSuggestion(this.form.controls.link.value, this.form.controls.description.value, this.parent_link).subscribe( res => {
            this.form.reset();
            this.messageService.notify(res.message);
        });
    }

}
