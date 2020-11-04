import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { from } from 'rxjs';
import { BackendService, Entity } from '../backend.service';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-code-monkey-club',
  templateUrl: './code-monkey-club.component.html',
  styleUrls: ['./code-monkey-club.component.scss'],
})
export class CodeMonkeyClubComponent implements OnInit {
  club: Entity;
  rulez: Entity;
  members: Entity[];
  membersLoaded = false;

  /**
   * Two coders required for a challenge
   */
  challengers: Entity[] = [];

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private statusService: StatusService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // get club details
    const id = Number.parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.backendService.getClubById(id).subscribe((club) => {
      this.club = club;
    });

    // get rulez
    this.backendService.getClubRulez(id).subscribe((rulez) => {
      this.rulez = rulez;
    });

    // get members
    this.backendService.getMembers().subscribe((members) => {
      this.members = [];
      members.forEach((member, index) => {
        setTimeout(() => {
          this.statusService.addMessage('CodeMonkeyClubComponent', 'introducting member', member.id);
          this.members.push(member);
          if (members.length === index + 1) {
            this.membersLoaded = true;
          }
        }, index * 200 + 200);
      });
    });
  }

  enterChallenger(member: Entity): void {
    // only when all members are loaded a code challenge may start
    if (!this.membersLoaded) {
      return;
    }
    const leaveChallenger = this.challengers.find((s) => s.id === member.id);
    if (leaveChallenger) {
      this.challengers = this.challengers.filter((s) => s.id !== member.id);
      this.statusService.addMessage('CodeMonkeyClubComponent', 'challenger leaving', member.id);
      return;
    }

    if (this.challengers.length >= 2) {
      return;
    }

    this.statusService.addMessage('CodeMonkeyClubComponent', 'challenger entered', member.id);
    this.challengers.push(member);
  }

  isChallenger(id: number): boolean {
    const selected = this.challengers.some((s) => s.id === id);
    return selected;
  }

  startChallenge(): void {
    const monkey1 = this.challengers[0].id;
    const monkey2 = this.challengers[1].id;
    const random = Math.random();
    const winner = random < 0.5 ? monkey1 : monkey2;
    const loser = winner === monkey1 ? monkey2 : monkey1;
    this.statusService.addMessage('CodeMonkeyClubComponent', `Code monkey ${monkey1} and ${monkey2} starts coding heavily...`);

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
        this.statusService.addMessage('CodeMonkeyClubComponent', round.text);
      }, round.round * 1000);
    });
  }
}
