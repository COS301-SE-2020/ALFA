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
    timeOutId: any;

    constructor(private messageService: MessageService) { }

    ngOnInit(): void {
        this.messageService.notifier.subscribe( msg =>{
            this.message = msg;
            this.show = false;
            this.toggleVisibility();
        });
    }

    toggleVisibility(): void{
        this.show = !this.show;
        if(this.show === true){
            let duration = Math.max( Math.min( (this.message.length) * 50, 2000 ), 7000 );
            this.timeOutId = setTimeout(() => {
                this.toggleVisibility();
            }, duration);
        }else{
            clearTimeout(this.timeOutId);
        }
    }
}
