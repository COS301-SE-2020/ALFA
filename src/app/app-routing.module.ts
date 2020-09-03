import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisFormComponent } from './analysis-form/analysis-form.component';
import { AboutComponent } from './about/about.component';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
  { path: '', component: AnalysisFormComponent },
  { path: 'about', component: AboutComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
