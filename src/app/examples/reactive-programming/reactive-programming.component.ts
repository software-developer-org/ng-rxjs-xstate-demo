import { Component, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExampleService, Exec } from '../example.service';

@Component({
  selector: 'reactive-programming',
  templateUrl: './reactive-programming.component.html',
  styleUrls: ['./reactive-programming.component.scss'],
})
export class ReactiveProgrammingComponent implements OnInit {
  a$ = new Subject<number>();
  b$ = new Subject<number>();
  sum$ = combineLatest([this.a$, this.b$]).pipe(map(([a, b]) => a + b));

  onlyEven$ = new Subject<boolean>();

  greaterThanFive$ = new Subject<boolean>();

  data$ = combineLatest([this.onlyEven$, this.greaterThanFive$]).pipe(
    map(([onlyEven, greaterThanFive]) => {
      console.log('>>>data');
      const data = new Array(10)
        .fill(0)
        .map((_, index) => index + 1)
        .filter((val) => (onlyEven ? val % 2 === 0 : val))
        .filter((val) => (greaterThanFive ? val > 5 : val));
      return data;
    })
  );

  constructor(private exampleService: ExampleService) {
    // init data
    setTimeout(() => {
      this.onlyEven$.next(false);
      this.greaterThanFive$.next(false);
    }, 100);
  }

  ngOnInit(): void {}

  demo(): void {
    const commands = [
      new Exec('a$ = ', () => {
        this.a$.next(1);
        return 1;
      }),
      new Exec('b$ = ', () => {
        this.b$.next(2);
        return 2;
      }),
      new Exec('sum$ = 3 // automatically updated '),

      new Exec('a$ = ', () => {
        this.a$.next(2);
        return 2;
      }),
      new Exec('sum$ = 4 // automatically updated '),

      new Exec('b$ = ', () => {
        this.b$.next(3);
        return 3;
      }),
      new Exec('sum$ = 5 // automatically updated '),
    ];
    this.exampleService.do('Reactive Programming', 200, true, commands);
  }
}
