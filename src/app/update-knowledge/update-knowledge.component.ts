import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArticleServiceService } from '../article-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-update-knowledge',
  templateUrl: './update-knowledge.component.html',
  styleUrls: ['./update-knowledge.component.css']
})
export class UpdateKnowledgeComponent implements OnInit {

  constructor(private articleService: ArticleServiceService, private location: Location) { }
  form = new FormGroup({
    description: new FormControl(''),
    link: new FormControl('') 
  });
  loading = false;
  ngOnInit(): void {
  }
  onSubmit(): void {
    if( this.form.controls.link.status != "VALID" || this.form.controls.link.value.toLowerCase().indexOf("http") < 0 ){
        // this.messageService.setMessage("error", "Please provide a valid URL for the 'Link' field. Don't forget the 'http://' prefix");
        // this.messageService.toggleVisibility();
        return;
    }
    if( this.form.controls.description.status != "VALID" ){
        // this.messageService.setMessage("error", "Please provide a value for the 'Description' field");
        // this.messageService.toggleVisibility();
        return;
    }

    this.loading = true;
    this.articleService.postArticles(this.form.value.link, this.form.value.description).subscribe(
      data => { 
        this.loading = false;
        // this.messageService.setMessage("success", "Article added to the knowledge base succesfully");
        // this.messageService.toggleVisibility();
        this.form.reset();
     }
    );
  }

  goBack(): void{
      this.location.back();
  }

}
