import { Component, Input, OnInit } from '@angular/core';
import 'goa-web-components';

@Component({
  selector: 'goa-ng-container',
  templateUrl: './goa-container.component.html',
  styleUrls: ['./goa-container.component.scss']
})
export class WCContainerComponent implements OnInit {

  constructor() { }

  // Defaults to large
  @Input()
  headingSize: string ;

  // defaults to large.
  @Input()
  variant = "default";

  ngOnInit(): void {
    console.log(this.headingSize);
  }

}
