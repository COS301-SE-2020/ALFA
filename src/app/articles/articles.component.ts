import { Component, OnInit } from '@angular/core';
import { ArticleServiceService } from '../article-service.service';
import { Article } from '../article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
    articles: Article[];
    isLoading: boolean = true;

  constructor(private articleService: ArticleServiceService) { }

  ngOnInit(): void {
      this.getArticles();
  }

  getArticles(): void {
      this.articleService.getArticles()
        .subscribe(
          _articles => {
              this.articles = _articles;
              this.isLoading = false;
        });
  }

}
