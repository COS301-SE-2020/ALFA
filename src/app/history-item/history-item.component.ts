import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.css']
})
export class HistoryItemComponent implements OnInit {
    URL: string;

    constructor(private activeRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activeRoute.params.subscribe( params => {
            this.URL = atob(params.url);
        });
    }

}
