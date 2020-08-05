import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';
import { Subject, Observable, of } from 'rxjs';
import { ArticleServiceService } from '../article-service.service';
import { Router }from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    @Input() article: Article;
    location: string;
    suggestToError: any = {};
    updateSuggestionError: Subject<any> = new Subject<any>();
    errors: any = [
        "Logfile Error 1",
        "Logfile Error 2",
        "Logfile Error 3",
        "Logfile Error 4"
    ];

  constructor(private articleService: ArticleServiceService, private router: Router) {
      this.updateSuggestionError.subscribe( val => {
          this.suggestToError = val;
      });
   }

  ngOnInit(): void {
      this.location = this.router.url;
    this.suggestToError.error = this.errors[0];
    this.suggestToError.id = `${this.article.kb_index}0`;
  }

  setSuggestToError(index: any): void {
    this.articleService.setSuggestionFormData({
        "error": this.errors[index],
        "id": `${this.article.kb_index}${index}`
    })
  }
  getSuggestToError(): any{
      return this.suggestToError;
  }

}
