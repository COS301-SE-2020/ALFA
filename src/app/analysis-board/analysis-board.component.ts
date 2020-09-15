import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';

@Component({
  selector: 'app-analysis-board',
  templateUrl: './analysis-board.component.html',
  styleUrls: ['./analysis-board.component.css']
})
export class AnalysisBoardComponent implements OnInit {
    @Input() analysisResults: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
