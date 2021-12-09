import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, forwardRef} from '@angular/core';
import 'goa-web-components'

@Component({
  selector: 'goa-ng-button',
  templateUrl: './goa-button.component.html',
  styleUrls: ['./goa-button.component.scss']
})
export class WCButtonComponent implements OnInit {

  @ViewChild('goaWCButton')
  private buttonElement: ElementRef<HTMLButtonElement>;

  private get button() {
    return this.buttonElement?.nativeElement;
  }
  constructor() { }

  @Input()
  type = 'primary';

  @Input()
  text ='';

  @Input()
  size = 'medium';

  @Output()
  myClick: EventEmitter< CustomEvent | undefined | null> =new EventEmitter<CustomEvent>();


  ngOnInit(): void { }

  ngAfterViewInit(){
    this.button.addEventListener('on:click',(state: CustomEvent)=> {
       console.log(state);
       this.myClick.emit(state);
    });
  }

}
