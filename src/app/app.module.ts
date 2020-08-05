import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UploadBoxComponent } from './upload-box/upload-box.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { LoaderComponent } from './loader/loader.component';
import { AnalysisBoardComponent } from './analysis-board/analysis-board.component';
import { AboutComponent } from './about/about.component';
import { UpdateKnowledgeComponent } from './update-knowledge/update-knowledge.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { SuggestionBoxComponent } from './suggestion-box/suggestion-box.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UploadBoxComponent,
    ArticlesComponent,
    ArticleComponent,
    LoaderComponent,
    AnalysisBoardComponent,
    AboutComponent,
    UpdateKnowledgeComponent,
    MessageComponent,
    SuggestionBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
