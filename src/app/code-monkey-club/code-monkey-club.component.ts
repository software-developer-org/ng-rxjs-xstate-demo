import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { from } from 'rxjs';
import { BackendService, Entity, MemberStatus } from '../backend.service';
import { LogService } from '../log.service';

@Component({
  selector: 'app-code-monkey-club',
  templateUrl: './code-monkey-club.component.html',
  styleUrls: ['./code-monkey-club.component.scss'],
})
export class CodeMonkeyClubComponent implements OnInit {
  club: Entity;
  rulez: Entity;
  members: Entity[];

  // flags for controlling ui flow
  // disable selecting a member while loading is not finished
  membersLoaded = false;
  // disable challenge button while another challenge is running
  codeChallengeStarted = false;

  /**
   * Two coders required for a challenge
   */
  challengers: Entity[] = [];

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private logService: LogService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // get club details
    const id = Number.parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.backendService.getClubById(id).subscribe(
      // next data subscriber
      (club) => {
        // log incoming data
        this.logService.log(
          'CodeMonkeyClubComponent',
          'showing details for code monkey club',
          club.id
        );
        this.club = club;
      },
      // error subscriber
      (error) => {
        // log incoming error
        this.logService.log('CodeMonkeyClubComponent', error);
      }
    );

    // get rulez
    this.backendService.getClubRulez(id).subscribe(
      // next data subscriber
      (rulez) => {
        // log incoming data
        this.logService.log('CodeMonkeyClubComponent', 'showing rulez');
        this.rulez = rulez;
      },
      // error subscriber
      (error) => {
        // log incoming error
        this.logService.log('CodeMonkeyClubComponent', error);
      }
    );

    // get members
    this.backendService.getMembers().subscribe(
      // next data subscriber
      (members) => {
        this.members = [];
        members.forEach((member, index) => {
          setTimeout(() => {
            // log incoming data
            this.logService.log(
              'CodeMonkeyClubComponent',
              'code monkey club',
              id,
              ': member',
              member.id
            );
            this.members.push(member);
            if (members.length === index + 1) {
              // has member has been added
              // set flag for all members being loaded
              this.membersLoaded = true;
            }
          }, index * 200 + 200);
        });
      },
      // error subscriber
      (error) => {
        // log incoming data
        this.logService.log('CodeMonkeyClubComponent', error);
      }
    );
  }

  enterChallenger(member: Entity): void {
    // only when all members are loaded a code challenge may start
    if (!this.membersLoaded) {
      return;
    }
    const leaveChallenger = this.challengers.find((s) => s.id === member.id);
    if (leaveChallenger) {
      this.challengers = this.challengers.filter((s) => s.id !== member.id);
      this.logService.log(
        'CodeMonkeyClubComponent',
        'challenger leaving',
        member.id
      );
      return;
    }

    if (this.challengers.length >= 2) {
      return;
    }

    this.logService.log(
      'CodeMonkeyClubComponent',
      'challenger entered',
      member.id
    );
    this.challengers.push(member);
  }

  isChallenger(id: number): boolean {
    const selected = this.challengers.some((s) => s.id === id);
    return selected;
  }

  startChallenge(): void {
    // set flag and disable user from starting another challenge
    this.codeChallengeStarted = true;
    const monkey1 = this.challengers[0].id;
    const monkey2 = this.challengers[1].id;
    const random = Math.random();
    const winner = random < 0.5 ? monkey1 : monkey2;
    const loser = winner === monkey1 ? monkey2 : monkey1;
    this.logService.log(
      'CodeMonkeyClubComponent',
      `Code monkey ${monkey1} and ${monkey2} starts coding heavily...`
    );

    const rounds = [
      {
        round: 1,
        text: `Round 1: Code monkey ${monkey1} and ${monkey2} starts coding...`,
      },
      {
        round: 2,
        text: `Round 2: Monkey ${loser} gets a bad exception...`,
      },
      {
        round: 3,
        text: `Round 3: Monkey ${winner} gets sources compiled ... and wins!`,
      },
    ];

    from(rounds).subscribe((round) => {
      setTimeout(() => {
        this.logService.log('CodeMonkeyClubComponent', round.text);
        if (round.round === 3) {
          // challenge is over
          // set flag and allow user from starting another challenge
          this.codeChallengeStarted = false;
        }
      }, round.round * 3000);
    });
  }

  isFirsttime(entity: Entity): boolean {
    return entity.description.some((e) => e === MemberStatus.Noob);
  }
}
