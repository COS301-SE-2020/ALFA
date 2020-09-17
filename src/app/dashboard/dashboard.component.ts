import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    isLoaded: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    iframeLoaded(): void{
        this.isLoaded = true;
    }

}
