import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ArticleServiceService } from './article-service.service';
import { Logfile } from './logfile';
import { Article } from './article';
import { AnalysisResult } from './analysis-result';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {
    URL: string = "https://alfa-ml-api.herokuapp.com/analyse";

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /**
   * @brief this function uploads a single file by sending a post request to the API
   * returns an array of analysisResults
   * @param logfile json object: { filename, date, data }
   * @returns returns an array of analysisResult objects that the api identifies as helpful
   */
  uploadLogFile(logfile: Logfile): Observable<AnalysisResult[]>{
      logfile.content = logfile.content.split("base64,")[1];
      return this.http.post<AnalysisResult[]>( this.URL, logfile/* , this.httpOptions */).pipe(
          tap( () => {}),
          catchError( this.handleError<AnalysisResult[]>('Logfile upload') )
      )
  }

  /**
   * @brief this function handles errors encountered during Http operations
   * @param operation the operation that failed
   * @param result optional value, returned as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T){
        return (err: any): Observable<T> =>{
            // console.log(err);

            this.messageService.notify(`Operation failed, an unexpected error occured.Please try again on contact the system administrator at pyraspace301@gmail.com`);

            return of(result as T);
        };
    }
}
