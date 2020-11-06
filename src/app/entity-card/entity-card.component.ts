import { Component, Input, OnInit } from '@angular/core';
import { Entity } from '../service/backend.service';

@Component({
  selector: 'app-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss']
})
export class EntityCardComponent implements OnInit {

  @Input() entity: Entity;

  constructor() { }

  ngOnInit(): void {
  }

}
