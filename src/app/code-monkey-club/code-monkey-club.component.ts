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

  selected: Entity[] = [];

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

  select(member: Entity): void {
    const deselect = this.selected.find((s) => s.id === member.id);
    if (deselect) {
      this.selected = this.selected.filter((s) => s.id !== member.id);
      console.log('deselected', member.id);
      return;
    }

    if (this.selected.length >= 2) {
      return;
    }

    console.log('selected', member.id);
    this.selected.push(member);
  }

  isSelected(id: number): boolean {
    const selected = this.selected.some((s) => s.id === id);
    return selected;
  }

  startCoding(): void {
    console.log('>>>>coding heavily');
    const monkey1 = this.selected[0].id;
    const monkey2 = this.selected[1].id;
    const random = Math.random();
    const winner = random < 0.5 ? monkey1 : monkey2;
    const loser = winner === monkey1 ? monkey2 : monkey1;
    this.boxring = `Code monkey ${monkey1} and ${monkey2} starts coding...`;

    const rounds = [
      {
        round: 1,
        text: `Round 1: Code monkey ${monkey1} and ${monkey2} starts coding...`,
      },
      {
        round: 2,
        text: `Round 2: Monkey ${loser} got hit by BadException...`,
      },
      {
        round: 3,
        text: `Round 3: Monkey ${winner} gets sources compiled ... and wins!`,
      },
    ];

    from(rounds).subscribe((round) => {
      setTimeout(() => {
        this.boxring += `
${round.text}`;
      }, round.round * 1000);
    });
  }
}
