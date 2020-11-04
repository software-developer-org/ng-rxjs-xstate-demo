import { combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export function imperativeProgramming(): void {
  // variables representing values
  let a = 1;
  let b = 2;

  // value of expression (a + b) is instantly assigned to sum
  let sum = a + b; // 3
  console.log('sum', sum);

  // assigning a new value has no effect on sum
  a = 2;
  b = 2;
  console.log('sum', sum); // 3, unchanged

  // incase a or b is updated, sum needs to be re-assigned with new values in a and b
  sum = a + b;
  console.log('sum', sum); // 4, re-evaluated expression
}

export function reactiveProgramming(): void {
  // variables representing streams, values are handled via streams
  // a stream in RxJS is represented by an Observable
  const a$: Subject<number> = new Subject<number>();
  // Subject is a special type of Observable allowing multicast to many Observers (=subscribers)
  const b$: Subject<number> = new Subject<number>();

  // combine both streams a$ and b$ to one stream
  const ab$: Observable<number[]> = combineLatest([a$, b$]);
  const sum$: Observable<number> = ab$
    // a pipe allows chaining
    .pipe(
      // map operator
      map(([aValue, bValue]) => aValue + bValue)
    );

  sum$.subscribe((total) => console.log('sum from stream', total)); // subscribe on streams a$ and b$
  a$.next(1); // pass value to a$ stream, ab$ stream is not notified yet

  // ab$ gets notified in case all observables has at least one value casted
  b$.next(2); // ab$: [1,2] => 3 is logged
  a$.next(2); // ab$: [2,2] => 4 is logged
  b$.next(3); // ab$: [2,3] => 5 is logged
}

/**
 * Source: https://stackoverflow.com/a/60934785/3437868
 */
export function observableForUnicast(): void {
  const obs$: Observable<number> = new Observable<number>((subscriber) => {
    subscriber.next(Math.random());
  });
  // unicast - subscribe invokes a NEW execution
  // each subscriber gets a different value
  obs$.subscribe((value) => console.log('Observable: subscriber 1:', value)); // Observable: subscriber 1: 0.6785303847338093
  obs$.subscribe((value) => console.log('Observable: subscriber 2:', value)); // Observable: subscriber 2: 0.01241168468788234
}

export function subjectForMulticast(): void {
  const obs$: Subject<number> = new Subject<number>();
  // multicast - subscribe does NOT invoke a new execution - similarly to listeners
  // each subscriber gets same value
  obs$.subscribe((value) => console.log('Subject: subscriber 1:', value)); // Subject: subscriber 1: 0.514955660934378
  obs$.subscribe((value) => console.log('Subject: subscriber 2:', value)); // Subject: subscriber 2: 0.514955660934378
  obs$.next(Math.random());
}
