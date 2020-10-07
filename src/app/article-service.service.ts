import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Article } from './article';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {
    URL: string = "https://mean-api-test-301.herokuapp.com";
    suggestionFormPayload: any = null;

    constructor(private http: HttpClient, private messageService: MessageService) { }

    getArticles(): Observable<Article[]> {
        return this.http.get<Article[]>(this.URL)
        .pipe(
            tap(() => {
            console.log("Fetched articles");
            }),
            catchError(this.handleError<Article[]>("get articles", []))
        );
    }
    // tslint:disable-next-line: typedef
    postArticles(lnk, descr): Observable<any> {
        return this.http.post(this.URL, { link: lnk, description: descr });
    }

    /**
     * Handle the suggestion form
     */
    setSuggestionFormData(payload: any): void {
        // console.log(JSON.stringify(payload));
        this.suggestionFormPayload = payload;
    }

    getSuggestionFormData(): any{
        return this.suggestionFormPayload;
    }

    /**
     * @brief this function handles errors encountered during Http operations
     * @param operation the opeeration that failed
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
