import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]>{
    return this.http.get<Article[]>( 'https://project-alfa.herokuapp.com/articles' )
        .pipe(
            tap( () => {
                console.log("Fetched articles");
            }),
            catchError( this.handleError<Article[]>("get articles", []) )
        );
  }

  /**
   * @brief this function handles errors encountered during Http operations
   * @param operation the opeeration that failed
   * @param result optional value, returned as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T){
    return (err: any): Observable<T> => {
        console.log(err);

        // TODO: show msg error to user
        // `${operation} failed: $(error.message}`)

        return of(result as T);
    };
}
}
