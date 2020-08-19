import { Injectable, EventEmitter } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    // message: string;

    notifier: EventEmitter<string> = new EventEmitter();

    constructor() { }

    notify(msg: string): void {
        this.notifier.emit(msg);
    }
}
