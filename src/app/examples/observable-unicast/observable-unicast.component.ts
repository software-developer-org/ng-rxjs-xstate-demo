import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExampleService, Exec } from '../example.service';

@Component({
  selector: 'observable-unicast',
  templateUrl: './observable-unicast.component.html',
  styleUrls: ['./observable-unicast.component.scss'],
})
export class ObservableUnicastComponent implements OnInit {
  obs$: Observable<number>;

  constructor(private exampleService: ExampleService) {}

  ngOnInit(): void {}

  demo(): void {
    this.obs$ = new Observable<number>((subscriber) => {
      subscriber.next(Math.random());
    });

    const commands = [
      new Exec('a = ', () => {
        this.obs$.subscribe();
        return 1;
      }),
    ];
    this.exampleService.do('Imperative Programming', true, commands);
  }
}
