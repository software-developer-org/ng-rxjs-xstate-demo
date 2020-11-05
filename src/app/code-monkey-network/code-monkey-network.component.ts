import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BackendService, Entity } from '../backend.service';
import { LogService } from '../log.service';

@Component({
  selector: 'app-code-monkey-clubs',
  templateUrl: './code-monkey-network.component.html',
  styleUrls: ['./code-monkey-network.component.scss'],
})
export class CodeMonkeyNetworkComponent implements OnInit {
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
            // if (clubs.length === index + 1) {
            //   this.spinner.hide();
            // }
          }, index * 500 + 500);
        });
      },
      // error subscriber
      (error) => {
        // log incoming error
        this.logService.log('CodeMonkeyClubComponent', error);
      }
    );
    // this.spinner.show();
  }

  loadAdditionalData(): void {
    this.backendService.addNewClub();
    this.loadData();
  }
}
