import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
    message: string;
    show: boolean = false;

    constructor(private messageService: MessageService) { }

    ngOnInit(): void {
        this.messageService.notifier.subscribe( msg =>{
            this.message = msg;
            this.toggleVisibility();
        });
    }

    toggleVisibility(): void{
        this.show = !this.show;
    }
}
