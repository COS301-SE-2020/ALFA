import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ALFA: Automated Log File Analyzer';

  constructor(route: ActivatedRoute) {
    // const url: Observable<string> = route.url.pipe( map(segments => segments.join('')) ) ;
    // console.log(url);
  }
  ngOnInit(): void {
    //   console.log(this.route.snapshot.data['path']);
  }

}
