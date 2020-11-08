import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ExampleService, Exec } from '../example.service';

@Component({
  selector: 'subject-multicast',
  templateUrl: './subject-multicast.component.html',
  styleUrls: ['./subject-multicast.component.scss']
})
export class SubjectMulticastComponent implements OnInit {

  subject$: Subject<number> = new Subject<number>();

  constructor(private exampleService: ExampleService) {}

  ngOnInit(): void {}

  demo(): void {

    const commands = [
      new Exec('random value = ', () => {
        const random = Math.random();
        this.subject$.next(random);
        return random;
      }),
    ];
    this.exampleService.do('Imperative Programming', 200, true, commands);
  }

}
