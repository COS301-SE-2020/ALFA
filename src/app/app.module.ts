import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UploadBoxComponent } from './upload-box/upload-box.component';
import { LoaderComponent } from './loader/loader.component';
import { AnalysisBoardComponent } from './analysis-board/analysis-board.component';
import { AboutComponent } from './about/about.component';
import { UpdateKnowledgeComponent } from './update-knowledge/update-knowledge.component';
import { MessageComponent } from './message/message.component';
import { AnalysisResultComponent } from './analysis-result/analysis-result.component';
import { SuggestionBoxComponent } from './suggestion-box/suggestion-box.component';
import { HistoryComponent } from './history/history.component';
import { AnalysisFormComponent } from './analysis-form/analysis-form.component';
import { PopularLogsComponent } from './popular-logs/popular-logs.component';
import { StatsPanelComponent } from './stats-panel/stats-panel.component';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UploadBoxComponent,
    LoaderComponent,
    AnalysisBoardComponent,
    AboutComponent,
    UpdateKnowledgeComponent,
    MessageComponent,
    AnalysisResultComponent,
    SuggestionBoxComponent,
    HistoryComponent,
    AnalysisFormComponent,
    PopularLogsComponent,
    StatsPanelComponent,
    LoginComponent,
    SignupComponent, DashboardComponent, ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
