/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';

export * from './goa-card-actions/goa-card-actions.component';
export * from './goa-card-content/goa-card-content.component';
export * from './goa-card-image/goa-card-image.component';


@Component({
  selector: 'goa-ng-card',
  templateUrl: './goa-card.component.html',
  styleUrls: ['./goa-card.component.scss']
})
export class WCCardComponent implements OnInit {

  constructor() { }
  @Input() elevation: number = 1;
  ngOnInit(): void {
  }

}
