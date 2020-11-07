import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, map } from 'rxjs/operators';
import { BackendService, Entity } from '../service/backend.service';
import { LogService } from '../service/log.service';
import { StateMachineUtils } from '../service/state-machine/state-machine.utils';

@Component({
  selector: 'code-monkey-clubs',
  templateUrl: './code-monkey-network.component.html',
  styleUrls: ['./code-monkey-network.component.scss'],
})
export class CodeMonkeyNetworkComponent implements OnInit {
  clubs$ = this.backendService.getClubs().pipe(
    map((clubs) => {
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
      return clubs;
    }),
    catchError((error) => {
      // log incoming error
      this.logService.log('CodeMonkeyClubComponent', error);
      throw error;
    })
  );

  clubs: Entity[];

  constructor(
    private backendService: BackendService,
    private logService: LogService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.clubs$.subscribe();
  }

  loadAdditionalData(): void {
    this.backendService.addNewClub();
    this.loadData();
  }
}
