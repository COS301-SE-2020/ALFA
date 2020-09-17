import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserManService {
    URL: string = "https://mean-api-test-301.herokuapp.com/users";
    notifier: EventEmitter<string> = new EventEmitter();

    constructor(private http: HttpClient, private messageService: MessageService, private router: Router) { }

    signup(userData: any): Observable<any>{
        return this.http.post(`${this.URL}/register`, userData).pipe(
            tap( ()=> {} ),
            catchError( this.handleError('Sign in', []) )
        )
    }

    signin(userData: any): Observable<any>{
        return this.http.post(`${this.URL}/login`, userData).pipe(
            tap( (res)=> {
                if(res && res["user_id"]){
                    localStorage.setItem("auth", res["user_id"]);
                    this.router.navigateByUrl("/");
                }
            }),
            catchError( this.handleError('Sign in', []) )
        )
    }

    isLoggedIn(): boolean{
        let auth = localStorage.getItem("auth");
        if(auth && auth.length > 0){
            return true;
        }
        
        return false;
    }

    signout(){
        localStorage.removeItem("auth");
        this.router.navigateByUrl("/signin");
    }

    emitSessionStatus(status: string){
        this.notifier.emit(status);
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
