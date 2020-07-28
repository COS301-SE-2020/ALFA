import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ArticleServiceService } from './article-service.service';
import { Logfile } from './logfile';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {
   /*  httpOptions = {
        hearders: new HttpHeaders({
            'Content-type': 'application/json',
        })
    }; */
    URL: string = "https://project-alfa.herokuapp.com/logfiles";

  constructor(private http: HttpClient, private article: ArticleServiceService) { }

  /**
   * @brief this function uploads a single file by sending a post request to the API
   * returns an array of articles
   * @param logfile json object: { filename, date, data }
   * @returns returns an array of Article objects that the api identifies as helpful
   */
  uploadLogFile(logfile: Logfile): Observable<Article[]>{
      return this.http.post<Article[]>( this.URL, logfile/* , this.httpOptions */).pipe(
          tap( data => {
              console.log(data);
              // TODO: show msg about upload success
          }),
          catchError( this.handleError<Article[]>('Logfile upload') )
      )
  }

  /**
   * @brief this function handles errors encountered during Http operations
   * @param operation the opeeration that failed
   * @param result optional value, returned as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T){
        return (err: any): Observable<T> =>{
            console.log(err);

            // TODO: show msg error to user
            // `${operation} failed: $(error.message}`)

            return of(result as T);
        };
    }
}
