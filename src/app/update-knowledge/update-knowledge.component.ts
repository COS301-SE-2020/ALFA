import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArticleServiceService } from '../article-service.service';
@Component({
  selector: 'app-update-knowledge',
  templateUrl: './update-knowledge.component.html',
  styleUrls: ['./update-knowledge.component.css']
})
export class UpdateKnowledgeComponent implements OnInit {

  constructor(private articleService: ArticleServiceService) { }
  form = new FormGroup({
    description: new FormControl(''),
    link: new FormControl('')
  });
  loading = false;
  ngOnInit(): void {
  }
  onSubmit(): void {
    this.loading = true;
    this.articleService.postArticles(this.form.value.link, this.form.value.description).subscribe(
      data => { console.log('Done'); this.loading = false; }
    );
  }

}
