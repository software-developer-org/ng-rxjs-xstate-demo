import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { from } from 'rxjs';
import { BackendService, Entity } from '../backend.service';

@Component({
  selector: 'app-code-monkey-club',
  templateUrl: './code-monkey-club.component.html',
  styleUrls: ['./code-monkey-club.component.scss'],
})
export class CodeMonkeyClubComponent implements OnInit {
  club: Entity;
  rulez: Entity;
  members: Entity[];

  /**
   * Two coders required for a challenge
   */
  challengers: Entity[] = [];

  boxring = ``;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
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
          console.log('introducting member', member.id);
          this.members.push(member);
          if (members.length === index + 1) {
            this.spinner.hide();
          }
        }, index * 200 + 200);
      });
    });
    this.spinner.show();
  }

  enterChallenger(member: Entity): void {
    const leaveChallenger = this.challengers.find((s) => s.id === member.id);
    if (leaveChallenger) {
      this.challengers = this.challengers.filter((s) => s.id !== member.id);
      console.log('challenger leaving', member.id);
      return;
    }

    if (this.challengers.length >= 2) {
      return;
    }

    console.log('challenger entered', member.id);
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
    this.boxring = `Code monkey ${monkey1} and ${monkey2} starts coding heavily...`;

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
        console.log(round.text);
        this.boxring += `
${round.text}`;
      }, round.round * 1000);
    });
  }
}
