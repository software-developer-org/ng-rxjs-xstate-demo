import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BackendService, Entity, getTime } from '../backend.service';

@Component({
  selector: 'app-code-monkey-clubs',
  templateUrl: './code-monkey-clubs.component.html',
  styleUrls: ['./code-monkey-clubs.component.scss']
})
export class CodeMonkeyClubsComponent implements OnInit {

  clubs: Entity[];

  constructor(private backendService: BackendService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.backendService.getClubs().subscribe(clubs => {
      this.clubs = [];
      clubs.forEach((club, index) => {
        setTimeout(() => {
          console.log(getTime(), 'entering code monkey club', club.id);
          this.clubs.push(club);
          // if (clubs.length === index + 1) {
          //   this.spinner.hide();
          // }
        }, index * 500 + 500);
      });
    });
    // this.spinner.show();
  }

  loadAdditionalData(): void {
    this.backendService.addNewClub();
    this.loadData();
  }

}
