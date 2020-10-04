import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisFormComponent } from './analysis-form/analysis-form.component';
import { AboutComponent } from './about/about.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { HistoryItemComponent } from './history-item/history-item.component';

const routes: Routes = [
  { path: '', component: AnalysisFormComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: AnalysisFormComponent },
  { path: 'about', component: AboutComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'history/:url', component: HistoryItemComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
