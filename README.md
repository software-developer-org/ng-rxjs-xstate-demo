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
  const a$: Subject<number> = new Subject<number>(); // [RxJS - Subject](https://rxjs.dev/guide/subject)
  // Subject is a special type of Observable allowing multicast to many Observers (=subscribers)
  const b$: Subject<number> = new Subject<number>();

  // combine both streams a$ and b$ to one stream
  const ab$: Observable<number[]> = combineLatest([a$, b$]);
  const sum$ = ab$
    // a pipe allows chaining
    .pipe(
      // map operator
      map(([aValue, bValue]) => aValue + bValue)
    );

  sum$.subscribe((total) => console.log('sum from stream', total)); // subscribe on streams a$ and b$
  a$.next(1);
  b$.next(2);
  a$.next(2);
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

# XState

Simplifying UI-Workflows by modelling finite state machines. In software design a UI workflow is described in linear transitions and all possible results. Doing the same in software development 'as-is' is horror and leads to complex implementations. Using FSMs (https://en.wikipedia.org/wiki/Finite-state_machine), in defining states and inputs, make code way simpler and easier to maintain.

# Resources
- [RxJS](https://rxjs.dev/guide/overview)
- [ReactiveX](http://reactivex.io)
- [XState](https://xstate.js.org)
