/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'goa-ng-card-image',
  templateUrl: './goa-card-image.component.html',
  styleUrls: ['./goa-card-image.component.scss']
})
export class WCCardImageComponent implements OnInit {

  constructor() { }
  @Input() src: string;
  @Input() height: string = "100%";
  ngOnInit(): void {
  }

}
