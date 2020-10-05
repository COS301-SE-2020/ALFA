import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
    linkEmitter: EventEmitter<string> = new EventEmitter();
    // URL: string = "https://project-alfa.herokuapp.com/";
    URL: string = "https://mean-api-test-301.herokuapp.com";

    constructor(private http: HttpClient, private messageService: MessageService) { }

    // send vote

    /**
     * 
     * @param _index kb_index
     * @param _id solution id
     * @param _vote voite either -1 or 1
     */
    vote(_link: string, _vote: number): Observable<any> {
        let data = {
            "link": _link,
            "vote": _vote
        };
        return this.http.post<any>(`${this.URL}/articles/rate_article`, data).pipe(
            tap( (res) => {
                this.messageService.notify(res.message);
            }),
            catchError( this.handleError<any>('Solution up/down voting') )
        );
    }

    /**
     * 
     * @param _url resource url
     * @param _descr resource title/description
     * @param _parent_link url field of the parent component
     */
    addSuggestion(_url: string, _descr: string, _parent_link: string): Observable<any> {
        let data = {
            "link": _url,
            "parent_link": _parent_link,
            "description": _descr,
            "comment": ""
        };

        return this.http.post<any>(`${this.URL}/articles/suggestion`, data).pipe(
            tap( (data) => {
                console.log(data);
                const msg = "Suggestion added succesfully. We appreciate your contribution, it helps us help others.";
                this.messageService.notify(msg);
            }),
            catchError( this.handleError<any>('Adding suggestion') )
        );
    }

    getHistory(email: string): Observable<any> {
        return this.http.get(`${this.URL}/history/${email}`).pipe(
            tap(),
            catchError( this.handleError("Fetching history", []))
        );
    }

    getHistoryItem(email: string, url: string): Observable<any>{
        return this.http.get(`${this.URL}/history/${email}/${url}`).pipe(
            tap( () => {}),
            catchError( this.handleError('Fetching history item'))
        );
    }

    getHistoryCount(): Observable<any>{
        return this.http.get<any>(`${this.URL}/history/count`).pipe(
            tap( () => {}),
            catchError( this.handleError('Get analysis count', []) )
        );
    }

    getUserHistoryCount(email: string): Observable<any>{
        return this.http.get<any>(`${this.URL}/history/${email}`).pipe(
            tap( () => {} ),
            catchError( this.handleError('Get user analysis count', []))
        );
    }

    getSuggestions(_link: string): Observable<any>{
        const payload = {"parent_link": _link}
        return this.http.post<any>(`${this.URL}/articles/getSuggestion`, payload).pipe(
            tap( () => {}),
            catchError( this.handleError('Getting suggestions', []) )
        )
    }

    /**
     * @param _index kb_index to emmit to the add suggestion component
     */
    emmitParentLink(_link: string): void {
        this.linkEmitter.emit(_link);
    }

    /**
     * @brief this function handles errors encountered during Http operations
     * @param operation the operation that failed
     * @param result optional value, returned as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T){
        return (err: any): Observable<T> =>{
            this.messageService.notify(`${operation} failed.Please try again on contact the system administrator at pyraspace301@gmail.com`);
            return of(result as T);
        };
    }
}
