/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit, Input } from '@angular/core';
import 'goa-web-components';
@Component({
  selector: 'goa-ng-badge',
  templateUrl: './goa-badge.component.html',
  styleUrls: ['./goa-badge.component.scss']
})
export class WCBadgeComponent implements OnInit {

  constructor() { }
  @Input() type: string;  // "success" | "warning" | "information" | "emergency" | "inactive" | "dark" | "midtone" | "light";
  @Input() content: string;
  @Input() icon: boolean = false;
  @Input() testId: string = "";

  ngOnInit(): void {
  }

}
