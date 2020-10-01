import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ALFA: Automated Log File Analyzer';
    containerType: string;

    constructor(private router: Router) {
        this.router.events.forEach( evt => {
            if(evt instanceof NavigationEnd){
                if(evt.url === '/dashboard'){
                    this.containerType = "container-fluid";
                }else{
                    this.containerType = "container";
                }
            }
        })
    }
    ngOnInit(): void {
    //   console.log(this.route.snapshot.data['path']);
    }

    ignoreDrop(evt): void{
        if(evt.toElement.type !== "file"){
            evt.preventDefault();
        }
    }
    ignoreDragOver(evt): void{
        evt.preventDefault();
    }

}
