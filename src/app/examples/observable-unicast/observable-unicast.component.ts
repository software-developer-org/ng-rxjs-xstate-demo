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
      new Exec('random value changes for each subscriber! ', () => {
        this.obs$.subscribe();
        return '';
      }),
    ];
    this.exampleService.do('Reactive Programming', 200, true, commands);
  }
}
