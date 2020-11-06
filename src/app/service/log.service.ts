import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { getTime } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private logs = '';

  private logs$ = new Subject<string>();

  constructor() {}

  log(source: string, ...args: any[]): void {
    let prefix = getTime() + ' ' + source;
    while (prefix.length < 40) {
      prefix += ' ';
    }

    // concat arguments into one log message
    const logMessage = args.reduce((last, current) => {
      // get stack trace in case of error
      const stringVal = current?.stack ? current.stack : current;
      return last + ' ' + stringVal;
    }, ':');

    // adds a log in a new line
    this.logs += `
${prefix}${logMessage}`;

    // multicast logs to Subject
    this.logs$.next(this.logs);
  }

  getLogs(): Observable<string> {
    return this.logs$;
  }
}
