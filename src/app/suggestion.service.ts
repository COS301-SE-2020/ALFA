import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
    indexEmmiter: EventEmitter<number> = new EventEmitter();
    // URL: string = "https://project-alfa.herokuapp.com/";
    URL: string = "https://mean-api-test-301.herokuapp.com/articles";

    constructor(private http: HttpClient, private messageService: MessageService) { }

    // send vote

    /**
     * 
     * @param _index kb_index
     * @param _id solution id
     * @param _vote voite either -1 or 1
     */
    vote(_index: number, _id: string, _vote: number): Observable<any> {
        let data = {
            "kb_index": _index,
            "_id": _id,
            "vote": _vote
        };
        return this.http.post(`${this.URL}/rate_article`, data).pipe(
            tap( () => {
                const msg = `You have ${(_vote == 1)? "upvoted":"downvoted"} the solution. We appreciate your contribution, it helps better train our Machine Learning model.`;
                this.messageService.notify(msg);
            }),
            catchError( this.handleError<any>('Solution up/down voting') )
        );
    }

    /**
     * 
     * @param _url resource url
     * @param _descr resource title/description
     * @param _index kb_index
     */
    addSuggestion(_url: string, _descr: string, _index: number): Observable<any> {
        let data = {
            "link": _url,
            "description": _descr
        };

        return this.http.post(`${this.URL}`, data).pipe(
            tap( () => {
                const msg = "Suggestion added succesfully. We appreciate your contribution, it helps better train our Machine Learning model.";
                this.messageService.notify(msg);
            }),
            catchError( this.handleError<any>('Adding suggestion') )
        );
    }

    getHistory(): Observable<any> {
        return this.http.get(`${this.URL}/history`).pipe(
            tap(),
            catchError( this.handleError("Fetching history", []))
        );
    }

     /**
     * 
     * @param _index kb_index to emmit to the add suggestion component
     */
    emmitKbIndex(_index: number): void {
        this.indexEmmiter.emit(_index);
    }

    /**
   * @brief this function handles errors encountered during Http operations
   * @param operation the operation that failed
   * @param result optional value, returned as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T){
        return (err: any): Observable<T> =>{
            this.messageService.notify(`Operation failed, an unexpected error occured.Please try again on contact the system administrator at pyraspace301@gmail.com`);
            return of(result as T);
        };
    }
}
