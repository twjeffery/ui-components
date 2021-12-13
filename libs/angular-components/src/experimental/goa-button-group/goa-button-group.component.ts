/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import 'goa-web-components';

@Component({
  selector: 'goa-ng-button-group',
  templateUrl: './goa-button-group.component.html',
  styleUrls: ['./goa-button-group.component.scss']
})
export class WCButtonGroupComponent implements OnInit {

  constructor() { }

  @Input() alignment: string =  "start";

  ngOnInit(): void {
  }

}
