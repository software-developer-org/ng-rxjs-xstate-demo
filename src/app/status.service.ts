import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { getTime } from './utils';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private messages = '';

  private messages$ = new Subject<string>();

  constructor() {}

  sendMessage(source: string, ...args: any[]): void {
    let prefix = getTime() + ' ' + source;
    while (prefix.length < 40) {
      prefix += ' ';
    }

    // adds a message in a new line
    const message = args.reduce((last, current) => {
      // get stack trace in case of error
      const stringVal = current?.stack ? current.stack : current;
      return last + ' ' + stringVal;
    }, ':');
    this.messages += `
${prefix}${message}`;
    this.messages$.next(this.messages);
  }

  getMessages(): Observable<string> {
    return this.messages$;
  }
}
