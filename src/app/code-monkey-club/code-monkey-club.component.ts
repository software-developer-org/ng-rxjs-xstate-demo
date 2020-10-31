import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
    const selected = this.selected.some(s => s.id === id);
    return selected;
  }

  startCoding(): void {
    console.log('>>>>coding heavily');
  }
}
