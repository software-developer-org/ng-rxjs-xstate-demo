import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../example.service';
import { Command } from '../example.service';

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
      new Command('a = ', () => (this.a = 1)),
      new Command('b = ', () => (this.b = 2)),
      new Command('sum = a + b = ', () => (this.sum = this.a + this.b)),
      new Command('a = ', () => (this.a = 2)),
      new Command('sum = ', () => this.sum),
      new Command('b = ', () => (this.b = 3)),
      new Command('sum = ', () => this.sum),
    ];
    this.exampleService.do('Imperative Programming', true, commands);
  }
}
