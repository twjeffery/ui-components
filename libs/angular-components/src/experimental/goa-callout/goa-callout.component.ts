import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'goa-ng-callout',
  templateUrl: './goa-callout.component.html',
  styleUrls: ['./goa-callout.component.scss']
})
export class WCCalloutComponent implements OnInit {

  constructor() { }

  @Input() type: "emergency" | "caution" | "information" | "event" | "success"

  ngOnInit(): void {
  }

}
