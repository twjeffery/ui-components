/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'goa-ng-icon-button',
  templateUrl: './goa-icon-button.component.html',
  styleUrls: ['./goa-icon-button.component.scss']
})
export class WCIconButtonComponent implements OnInit {

  @ViewChild('goaWCButton')
  private buttonElement: ElementRef<HTMLButtonElement>;

  private get button() {
    return this.buttonElement?.nativeElement;
  }

  @Input() size: IconSize = 'medium';
  @Input() type: string;
  @Input() style: string = 'outline';
  @Input() inverted: boolean = false;



  @Output()
  myClick: EventEmitter< CustomEvent | undefined | null> =new EventEmitter<CustomEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.button.addEventListener('on:click',(state: CustomEvent)=> {
       console.log(state);
       this.myClick.emit(state);
    });
  }

}


export type IconSize = "small" | "medium" | "large" | "xlarge";