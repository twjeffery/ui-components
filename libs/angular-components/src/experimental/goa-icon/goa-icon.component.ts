/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import 'goa-web-components';

@Component({
  selector: 'goa-ng-icon',
  templateUrl: './goa-icon.component.html',
  styleUrls: ['./goa-icon.component.scss']
})
export class WCIconComponent implements OnInit {


  constructor() { }

  @Input() type: string;

  @Input() size: string = "medium" ;

  @Input() style1:  string = "outline";

  @Input() inverted: boolean = false;



  ngOnInit(): void {

  }

}
