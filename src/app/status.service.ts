import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private messages = '';

  private messages$ = new Subject<string>();

  constructor() { }

  addMessage(...args: any[]): void {
    const message = args.reduce((last, current) => last + ' ' + current, '');
    // adds a message in a new line
    this.messages += `
${message}`;
    this.messages$.next(this.messages);
  }

  getMessages(): Observable<string> {
    return this.messages$;
  }
}
