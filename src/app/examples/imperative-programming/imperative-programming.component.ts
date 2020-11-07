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
    this.exampleService.do('Imperative Programming', true, commands);
  }
}
