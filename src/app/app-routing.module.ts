import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadBoxComponent } from './upload-box/upload-box.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', component: UploadBoxComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
