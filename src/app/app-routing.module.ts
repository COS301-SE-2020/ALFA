import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadBoxComponent } from './upload-box/upload-box.component';
import { ArticlesComponent } from './articles/articles.component';
import { AboutComponent } from './about/about.component';
import { UpdateKnowledgeComponent } from './update-knowledge/update-knowledge.component';


const routes: Routes = [
  { path: '', component: UploadBoxComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'update_knowledge', component: UpdateKnowledgeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
