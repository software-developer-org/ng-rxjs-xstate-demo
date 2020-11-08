import { Component, OnInit } from '@angular/core';
import { ExampleService, Exec } from '../example.service';

@Component({
  selector: 'imperative-programming',
  templateUrl: './imperative-programming.component.html',
  styleUrls: ['./imperative-programming.component.scss'],
})
export class ImperativeProgrammingComponent implements OnInit {
  sum: number;
  a: number;
  b: number;

  // tslint:disable-next-line:variable-name
  private _onlyEven = false;
  get onlyEven(): boolean {
    return this._onlyEven;
  }
  set onlyEven(onlyEven: boolean) {
    this._onlyEven = onlyEven;
    this.updateData();
  }

  // tslint:disable-next-line:variable-name
  private _greaterThanFive = false;
  get greaterThanFive(): boolean {
    return this._greaterThanFive;
  }
  set greaterThanFive(greaterThanFive: boolean) {
    this._greaterThanFive = greaterThanFive;
    this.updateData();
  }

  data: number[];

  constructor(private exampleService: ExampleService) {}

  ngOnInit(): void {}

  demo(): void {
    this.sum = null;
    this.a = null;
    this.b = null;
    const commands = [
      new Exec('a = ', () => (this.a = 1)),
      new Exec('b = ', () => (this.b = 2)),
      new Exec('sum = a + b = ', () => (this.sum = this.a + this.b)),
      new Exec('a = ', () => (this.a = 2)),
      new Exec('sum = ', () => this.sum),
      new Exec('b = ', () => (this.b = 3)),
      new Exec('sum = ', () => this.sum),
    ];
    this.exampleService.do('Imperative Programming', 200, true, commands);
  }

  updateData(): void {
    this.data = new Array(10)
      .fill(0)
      .map((_, index) => index + 1)
      .filter((val) => (this.onlyEven ? val % 2 === 0 : val))
      .filter((val) => (this.greaterThanFive ? val > 5 : val));
  }
}
