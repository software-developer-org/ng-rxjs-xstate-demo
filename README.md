# Ng RxJS and XState Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.2.

## Install

Run `npm install`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Abstract

- [ReactiveX](http://reactivex.io)
- [RxJS](https://rxjs.dev/guide/overview)
- [XState](https://xstate.js.org)

# RxJS

## What is Reactive Programming?

> ...In computing, reactive programming is a declarative programming paradigm concerned with data streams and the propagation of change. With this paradigm it is possible to express static (e.g., arrays) or dynamic (e.g., event emitters) data streams with ease, and also communicate that an inferred dependency within the associated execution model exists, which facilitates the automatic propagation of the changed data flow.[citation needed]
>
> For example, in an imperative programming setting, **a:= b + c** would mean that **a** is being assigned the result of **b + c** in the instant the expression is evaluated, and later, the values of **b** and **c** can be changed with no effect on the value of **a**. On the other hand, in reactive programming, the value of **a** is automatically updated whenever the values of **b** or **c** change, without the program having to re-execute the statement **a:= b + c** to determine the presently assigned value of **a**.

-- source: [Wikipedia: reactive programming](https://en.wikipedia.org/wiki/Reactive_programming)


## Example: a = b + c

### Imperative Programming

In imperative programming it is quite simple. A sum is the (instant!) value of a and b.

``` typescript
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
```

In the abvoe example it shows once the sum is assigned, assigning a new value to a or b has now effect on the sum itself. In case sum needs to be updated, the expression needs to be re-evaluated.

### Imperative Vs Reactive Programming

In reactive programming streams are respresented by one core type in RxJS: [Observable](https://rxjs.dev/guide/observable).

Operations on an Observable can be done through [pipe operators](https://rxjs.dev/guide/operators) like map, merge, catchError, etc.

A [Subject](https://rxjs.dev/guide/subject) is a special type of Observable allowing multicasting.

``` typescript
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
```

## What is RxJS?

> The Observer pattern done right
>
> ReactiveX is a combination of the best ideas from the [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern), the [Iterator pattern](https://en.wikipedia.org/wiki/Iterator_pattern), and [functional programming](http://martinfowler.com/articles/collection-pipeline/#NestedOperatorExpressions)

-- source: [ReactiveX](http://reactivex.io)

ReactiveX (Reactive Extensions) especially enhances reactive programming with possibilities to combine and transform streams using query-like operators.

> RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array#extras (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

-- source: [RxJS - Introduction](https://rxjs.dev/guide/overview)

RxJS is a JavaScript implementation of [ReactiveX (Reactive extensions)](http://reactivex.io).

### Observer Pattern

The [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) is used for data streams and data propagation. An object, called Subject, maintaining a list dependents, called Observers, that gets notified.

UML class diagram of Observer pattern.
![UML class diagram of Observer pattern](https://upload.wikimedia.org/wikipedia/commons/a/a8/Observer_w_update.svg)

A sample UML class and sequence diagram for the Observer design pattern.
![A sample UML class and sequence diagram for the Observer design pattern.](https://upload.wikimedia.org/wikipedia/commons/0/01/W3sDesign_Observer_Design_Pattern_UML.jpg)

### Iterator Pattern

The [Iterator pattern](https://en.wikipedia.org/wiki/Iterator_pattern) loops through a stream of data (Iterable.next()) and may complete (Iterable.complete()) or may throw an error (Iterable.error()).

UML class diagram of Iterator pattern.
![UML class diagram of Iterator pattern](https://upload.wikimedia.org/wikipedia/commons/1/13/Iterator_UML_class_diagram.svg)

A sample UML class and sequence diagram for the Iterator design pattern.
![A sample UML class and sequence diagram for the Iterator design pattern.](https://upload.wikimedia.org/wikipedia/commons/c/c5/W3sDesign_Iterator_Design_Pattern_UML.jpg)

### ReactiveX - Differences and What it is not

- a paradigm that goes beyond the Observer pattern allowing to subscribe on, transform, combine data streams and even control the threading of the streams - [StackOverflow](https://stackoverflow.com/a/16652921).
- an [Observable differs from a Promise](https://angular.io/guide/comparing-observables#observables-compared-to-promises), since it…
  - … is declarative and starts on subscriptions
  - … provide many values
  - … allows chaining/piping of operations

# Demo application

This app introduces you to all the Code Monkeys in the world. The app shows you:

- A network of all Code Monkey clubs.
- New clubs are incubating in various places and countries.
- Each club holds a number of loosely connected members.
- Each member follows strictly the Code Monkey rulez.

There are two views: Network View of Code Monkey Clubs and Detail View of a Code Monkey Club

## Network View of Code Monkey Clubs

![](./Network_View.PNG)

## Detail View of a Code Monkey Club

![](./Club_View.PNG)

## Status Bar

![](./Status-Bar.PNG)

All actions like code fights or backend calls are logging into a status bar shown in the footer.

The following sections provide RxJS and XState examples in this demo app.

# RxJS log service example: Sharing Data through Streams

One common usage is sharing data between components. Especially data changing constantly through time are perfect candidates for using streams.

RxJS' [Subject](https://rxjs.dev/guide/subject) is special type of an [Observable](https://rxjs.dev/guide/observable):

- Sending data: [Subject.next(value?: T)](https://rxjs.dev/api/index/class/Subject#next-) allows a component to send data.
- Receiving data: [Object.subscribe()](https://rxjs.dev/api/index/class/Observable#subscribe-) allows a component to receive data.

### Log Service
Here is a log service allowing a producer (component) sending and a consumer (component) receiving logs:

```typescript
export class LogService {
  ...
  private logs$ = new Subject<string>();
  ...
  log(source: string, ...args: any[]): void {
    ...
    // concat arguments into one log message
    const logMessage = args.reduce((last, current) => {
      ...
    }, ':');
    ...
    // multicast logs to Subject
    this.logs$.next(this.logs);
  }

  getLogs(): Observable<string> {
    return this.logs$;
  }
}
```

### Producers: CodeMonkeyNetworkComponent and CodeMonkeyClubComponent

The network and code monkey components are sending logs:

```typescript
export class CodeMonkeyNetworkComponent implements OnInit {
  ...
  loadData(): void {
    this.backendService.getClubs().subscribe(
      // next data subscriber
      (clubs) => {
        this.clubs = [];
        clubs.forEach((club, index) => {
          setTimeout(() => {
            // log incoming data
            this.logService.log(
              'CodeMonkeyNetworkComponent',
              'Adding to network: ',
              club.id
            );
            this.clubs.push(club);
          }, index * 500 + 500);
        });
      },
      // error subscriber
      (error) => {
        // log incoming error
        this.logService.log('CodeMonkeyClubComponent', error);
      }
    );
  }
  ...
}
```

```typescript
export class CodeMonkeyClubComponent implements OnInit {
  ...
  loadData(): void {
    // get club details
    const id = Number.parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.backendService.getClubById(id).subscribe(
      // next data subscriber
      (club) => {
        // log incoming data
        this.logService.log(
          'CodeMonkeyClubComponent',
          'showing details for code monkey club',
          club.id
        );
        this.club = club;
      },
      // error subscriber
      (error) => {
        // log incoming error
        this.logService.log('CodeMonkeyClubComponent', error);
      }
    );

    // get rulez
    this.backendService.getClubRulez(id).subscribe(
      ...
    );

    // get members
    this.backendService.getMembers().subscribe(
      ...
    );
  }
  ...
}
```

### Consumer: StatusBarComponent

The status bar component get a messages Observable (resp. Subject) from the log service:

```typescript
export class StatusBarComponent implements OnInit {
  // NOTE: subscribe is done in template using async pipe
  logs$: Observable<string>;

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    // get logs for displaying in status bar template
    this.logs$ = this.logService.getLogs().pipe(
      // tap: a pipe operator that 'peaks' for incoming data
      // this is useful e.g. for side effects
      tap(() => {
        // auto scroll textarea to bottom
        this.scrollToBottom();
      }),
    );
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const textarea = document.getElementById('status-bar');
      textarea.scrollTop = textarea.scrollHeight;
    }, 50);
  }
}
```

# RxJS `Observable.subscribe()` example - Observables are Descriptive and not executed until `subscribe()` is called!

An Observable is descriptive. This means it is not executed immediately. This happens when it [subscribe()](https://rxjs.dev/api/index/class/Observable#subscribe-) is called.

## Status Bar example: Subscribing and Displaying Logs

The status bar component holds a logs$ Observable:

```typescript
export class StatusBarComponent implements OnInit {
  // NOTE: subscribe is done in template using async pipe
  logs$: Observable<string>;
  ...
  ngOnInit(): void {
    // get logs for displaying in status bar template
    this.logs$ = this.logService.getLogs().pipe(
      ...
    );
  }
  ...
}
```

But how is it possible that the status bar template is showing logs though?

In Angular there is an [AsyncPipe](https://angular.io/api/common/AsyncPipe) that can be used in an template. This pipe subscribes to an Observable and returns its data to the template:

```html
<!-- Subsribe logs$ using async -->
<textarea id="status-bar" class="status-bar" fxFlex="grow">{{ logs$ | async}}</textarea>
```

Another way is directly subscribing an Observable in the component:

```typescript
export class StatusBarComponent implements OnInit {

  logs: string;
  ...
  ngOnInit(): void {
    // get logs for displaying in status bar template
    this.logService.getLogs().pipe(
      ...
    )
    // subscribe and update logs
    .subscribe(messages => this.statusMessages = messages);
  }
  ...
}
```

```html
<textarea id="status-bar" class="status-bar" fxFlex="grow">{{ logs }}</textarea>
```

In case the component does not subscribe to it, the logs keeps empty (undefined):

```typescript
export class StatusBarComponent implements OnInit {

  logs: string;
  ...
  ngOnInit(): void {
    // get logs for displaying in status bar template
    this.logService.getLogs().pipe(
      ...
    );
    // NO subscribe() has been called, hence logs keeps undefined!!!
  }
  ...
}
```

# RxJS `Observable.unsubscribe()` examples

## `unsubscribe()` to the Rescue: Clean Up Resources, Avoid Memory Leaks and Side Effects

Imagine there is a component listening to mouse down events:

```typescript
import { from, fromEvent } from 'rxjs';
...
export class CodeMonkeyClubComponent implements OnInit {
  ...
  ngOnInit(): void {
    const id = Math.random();
    fromEvent(document, 'mousedown').subscribe((event) =>
      console.log(id, ': Do something on MouseDown ', Math.random())
    );
    ...
  }
  ...
}
```

The result would be something like this when a user triggers 3 times a mouse down event:

```log
0.9938084620538779 ": Do something on MouseDown " 0.005569280694061041
0.9938084620538779 ": Do something on MouseDown " 0.7817118424445497
0.9938084620538779 ": Do something on MouseDown " 0.060648653169596445
```

Another result is when a user leaves and re-enters this component and it triggers 3 times a mouse down event:

```log
0.9938084620538779 ": Do something on MouseDown " 0.23735551079882278
0.8620868116145006 ": Do something on MouseDown " 0.7611125869058986
0.9938084620538779 ": Do something on MouseDown " 0.906273375314228
0.8620868116145006 ": Do something on MouseDown " 0.02662434244303835
0.9938084620538779 ": Do something on MouseDown " 0.16487297643511
0.8620868116145006 ": Do something on MouseDown " 0.9333783099795039
```

What you see here is that there are 6 instead of 3 log entries. The reason is the previous observable is still in memory and hence not been cleanup.

This can be solved by unsubscribing a Subscription:

```typescript
import { from, fromEvent, Subscription } from 'rxjs';
...
export class CodeMonkeyClubComponent implements OnInit, OnDestroy {
  ...
  mouseDownSubscription: Subscription;

  ngOnInit(): void {
    const id = Math.random();
    this.mouseDownSubscription = fromEvent(document, 'mousedown').subscribe((event) =>
      console.log(id, ': Do something on MouseDown ', Math.random())
    );
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.mouseDownSubscription) {
      this.mouseDownSubscription.unsubscribe();
    }
  }
  ...
}
```

## `unsubscribe()` Cancels `subscribe()`: HTTP Requests and Responses

Client apps often require data from a backend. The data are then processed and displayed in various user interfaces. This may be handled through HTTP requests and responses.

The demo app a user starts with the network view. In this view it selects club 1 and jumps to this code monkey club view. This view has the following logs:

```log
0:1:29.502 BackendService               : Request GET /club/1
0:1:29.504 BackendService               : Request GET /club/1/rulez
0:1:29.505 BackendService               : Request GET /members
0:1:29.707 BackendService               : Response GET /members
0:1:29.921 CodeMonkeyClubComponent      : code monkey club 1 : member 0
0:1:30.004 BackendService               : Response GET /clubs/1
0:1:30.005 CodeMonkeyClubComponent      : showing details for code monkey club 1
0:1:30.109 CodeMonkeyClubComponent      : code monkey club 1 : member 1
0:1:30.311 CodeMonkeyClubComponent      : code monkey club 1 : member 2
0:1:30.509 CodeMonkeyClubComponent      : code monkey club 1 : member 3
0:1:30.718 CodeMonkeyClubComponent      : code monkey club 1 : member 4
0:1:30.910 CodeMonkeyClubComponent      : code monkey club 1 : member 5
0:1:31.005 BackendService               : Response GET /club/1/rulez
0:1:31.005 CodeMonkeyClubComponent      : showing rulez
0:1:31.109 CodeMonkeyClubComponent      : code monkey club 1 : member 6
0:1:31.323 CodeMonkeyClubComponent      : code monkey club 1 : member 7
0:1:31.523 CodeMonkeyClubComponent      : code monkey club 1 : member 8
0:1:31.708 CodeMonkeyClubComponent      : code monkey club 1 : member 9
```

It may be not obvious, but often a process or user action is started and not finished. A user may start an action or enter a view by mistake. In this case another user mistakenly entered club 1, jumps back immediately, and enters club 3:

```log
...
// user enters view for club 1
0:16:13.456 BackendService              : Request GET /club/1
0:16:13.457 BackendService              : Request GET /club/1/rulez
0:16:13.457 BackendService              : Request GET /members
0:16:13.659 BackendService              : Response GET /members
0:16:13.861 CodeMonkeyClubComponent     : code monkey club 1 : member 0
// user goes back to network view, handling a HTTP request
0:16:13.934 BackendService              : Request GET /clubs
// ... in the meanwhile previous view from club 1 is still processed!
0:16:13.957 BackendService              : Response GET /clubs/1
0:16:13.958 CodeMonkeyClubComponent     : showing details for code monkey club 1
0:16:14.060 CodeMonkeyClubComponent     : code monkey club 1 : member 1
0:16:14.274 CodeMonkeyClubComponent     : code monkey club 1 : member 2
0:16:14.476 CodeMonkeyClubComponent     : code monkey club 1 : member 3
0:16:14.677 CodeMonkeyClubComponent     : code monkey club 1 : member 4
0:16:14.860 CodeMonkeyClubComponent     : code monkey club 1 : member 5
// ... while current network view is processing HTTP Response
0:16:14.936 BackendService              : Response GET /clubs
// ... previous view continues processing
0:16:14.958 BackendService              : Response GET /club/1/rulez
0:16:14.958 CodeMonkeyClubComponent     : showing rulez
0:16:15.060 CodeMonkeyClubComponent     : code monkey club 1 : member 6
0:16:15.261 CodeMonkeyClubComponent     : code monkey club 1 : member 7
0:16:15.436 CodeMonkeyNetworkComponent  : Adding to network:  0
0:16:15.460 CodeMonkeyClubComponent     : code monkey club 1 : member 8
// ... finally previous view is finished!
0:16:15.661 CodeMonkeyClubComponent     : code monkey club 1 : member 9
0:16:15.937 CodeMonkeyNetworkComponent  : Adding to network:  1
0:16:16.452 CodeMonkeyNetworkComponent  : Adding to network:  2
// ... network view displays club 3
0:16:16.939 CodeMonkeyNetworkComponent  : Adding to network:  3
// ... user clicks and jumps to club 3
0:16:17.229 BackendService              : Request GET /club/3
0:16:17.230 BackendService              : Request GET /club/3/rulez
0:16:17.230 BackendService              : Request GET /members
0:16:17.431 BackendService              : Response GET /members
// ... while now former network view keeps processing!
0:16:17.437 CodeMonkeyNetworkComponent  : Adding to network:  4
0:16:17.645 CodeMonkeyClubComponent     : code monkey club 3 : member 0
0:16:17.730 BackendService              : Response GET /clubs/3
0:16:17.731 CodeMonkeyClubComponent     : showing details for code monkey club 3
0:16:17.832 CodeMonkeyClubComponent     : code monkey club 3 : member 1
0:16:17.948 CodeMonkeyNetworkComponent  : Adding to network:  5
0:16:18.032 CodeMonkeyClubComponent     : code monkey club 3 : member 2
0:16:18.234 CodeMonkeyClubComponent     : code monkey club 3 : member 3
0:16:18.435 CodeMonkeyClubComponent     : code monkey club 3 : member 4
0:16:18.440 CodeMonkeyNetworkComponent  : Adding to network:  6
0:16:18.636 CodeMonkeyClubComponent     : code monkey club 3 : member 5
0:16:18.730 BackendService              : Response GET /club/3/rulez
0:16:18.731 CodeMonkeyClubComponent     : showing rulez
0:16:18.832 CodeMonkeyClubComponent     : code monkey club 3 : member 6
0:16:19.038 CodeMonkeyClubComponent     : code monkey club 3 : member 7
0:16:19.239 CodeMonkeyClubComponent     : code monkey club 3 : member 8
0:16:19.432 CodeMonkeyClubComponent     : code monkey club 3 : member 9
```

What you see here is that each view is finishing all HTTP requests:

1. the view for club 1,
2. the network view, and
3. the view for club 3 handles all HTTP responses.

Each view subscribes and handles HTTP responses - even if a user leaves a view immediately!

Using unsubscribe() allows to cancel an HTTP response in case it hasn't been started yet:

```typescript
export class CodeMonkeyNetworkComponent implements OnInit, OnDestroy {
  ...
  getClubsSubscription: Subscription;
  ...
  loadData(): void {
    this.getClubsSubscription = this.backendService.getClubs().subscribe(
      ...
    );
  }
  ...
  ngOnDestroy(): void {
    if (this.getClubsSubscription) {
      this.getClubsSubscription.unsubscribe();
    }
  }
  ...
}
```

```typescript
export class CodeMonkeyClubComponent implements OnInit, OnDestroy {
  ...
  getClubByIdSubscription: Subscription;
  getClubRulezSubscription: Subscription;
  getMembersSubscription: Subscription;
  ...
  loadData(): void {
    ...
    this.getClubByIdSubscription = this.backendService.getClubById(id).subscribe(
      ...
    );

    // get rulez
    this.getClubRulezSubscription = this.backendService.getClubRulez(id).subscribe(
      ...
    );

    // get members
    this.getMembersSubscription = this.backendService.getMembers().subscribe(
      ...
    );
  }

  ngOnDestroy(): void {
    if (this.getClubByIdSubscription) {
      this.getClubByIdSubscription.unsubscribe();
    }
    if (this.getClubRulezSubscription) {
      this.getClubRulezSubscription.unsubscribe();
    }
    if (this.getMembersSubscription) {
      this.getMembersSubscription.unsubscribe();
    }
  }
  ...
}
```

The result log looks like this:

```log
// user enters view for club 1
0:50:09.785 BackendService              : Request GET /club/1
0:50:09.786 BackendService              : Request GET /club/1/rulez
0:50:09.786 BackendService              : Request GET /members
// user goes back to network view, handling a HTTP request
0:50:10.131 BackendService              : Request GET /clubs
0:50:11.133 BackendService              : Response GET /clubs
0:50:11.635 CodeMonkeyNetworkComponent  : Adding to network:  0
// ... in the meanwhile previous view from club 1 returns HTTP responses but(!) subscription are not executed!
0:50:11.787 BackendService              : Response GET /clubs/1
0:50:11.788 BackendService              : Response GET /club/1/rulez
0:50:11.789 BackendService              : Response GET /members
// ... while current network view is processing HTTP response
0:50:12.148 CodeMonkeyNetworkComponent  : Adding to network:  1
0:50:12.636 CodeMonkeyNetworkComponent  : Adding to network:  2
// ... network view displays club 3
0:50:13.141 CodeMonkeyNetworkComponent  : Adding to network:  3
// ... user clicks and jumps to club 3
0:50:13.507 BackendService              : Request GET /club/3
0:50:13.507 BackendService              : Request GET /club/3/rulez
0:50:13.507 BackendService              : Request GET /members
// ... previous network view finishes subscription job
0:50:13.635 CodeMonkeyNetworkComponent  : Adding to network:  4
0:50:14.135 CodeMonkeyNetworkComponent  : Adding to network:  5
0:50:14.634 CodeMonkeyNetworkComponent  : Adding to network:  6
// ... current view for club 3 finishes all subscriptions and HTTP responses
0:50:15.514 BackendService              : Response GET /clubs/3
0:50:15.514 CodeMonkeyClubComponent     : showing details for code monkey club 3
0:50:15.516 BackendService              : Response GET /club/3/rulez
0:50:15.516 CodeMonkeyClubComponent     : showing rulez
0:50:15.521 BackendService              : Response GET /members
0:50:15.729 CodeMonkeyClubComponent     : code monkey club 3 : member 0
0:50:15.929 CodeMonkeyClubComponent     : code monkey club 3 : member 1
0:50:16.121 CodeMonkeyClubComponent     : code monkey club 3 : member 2
0:50:16.321 CodeMonkeyClubComponent     : code monkey club 3 : member 3
0:50:16.535 CodeMonkeyClubComponent     : code monkey club 3 : member 4
0:50:16.722 CodeMonkeyClubComponent     : code monkey club 3 : member 5
0:50:16.922 CodeMonkeyClubComponent     : code monkey club 3 : member 6
0:50:17.121 CodeMonkeyClubComponent     : code monkey club 3 : member 7
0:50:17.324 CodeMonkeyClubComponent     : code monkey club 3 : member 8
0:50:17.524 CodeMonkeyClubComponent     : code monkey club 3 : member 9
```

# XState

Simplifying UI-Workflows by modelling finite state machines. In software design a UI workflow is described in linear transitions and all possible results. Doing the same in software development 'as-is' is horror and leads to complex implementations. Using FSMs (https://en.wikipedia.org/wiki/Finite-state_machine), in defining states and inputs, make code way simpler and easier to maintain.

# Resources
- [RxJS](https://rxjs.dev/guide/overview)
- [ReactiveX](http://reactivex.io)
- [XState](https://xstate.js.org)
