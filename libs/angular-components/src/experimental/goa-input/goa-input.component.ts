/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import "goa-web-components"

@Component({
  selector: 'goa-ng-input',
  templateUrl: './goa-input.component.html',
  styleUrls: ['./goa-input.component.scss'],
  providers: [
    {       provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => WCInputComponent),
            multi: true
    },
  ]
})
export class WCInputComponent implements OnInit, ControlValueAccessor {

  constructor(private cdr: ChangeDetectorRef) { }


  @ViewChild('goaWcInput')
  private inputElement: ElementRef<HTMLInputElement>;

  private get input() {
    return this.inputElement?.nativeElement;
  }

  private _value: string;

  @Input() type : string;
  @Input() name: string;

  @Input() id: string;
  @Input() disabled: boolean = false;
  @Input() leadingicon: string = null;
  @Input() trailingicon: string = null;
  @Input() variant: string = "goa";
  @Input() focused: boolean = false;
  @Input() readonly: boolean = false;
  @Input() handletrailingiconclick: boolean = false;
  @Input() error: boolean = false;

  @Input()
  set value(val: string | null | undefined){
    const newVal = (val === undefined || val === null)? "": val;

    if (this._value !== newVal) {
      this._value = newVal;
      this.onChange?.(newVal);
      this.valueChanged.emit(newVal);
      console.log(newVal);
    }

  }

  get value():string | undefined | null{
    return this._value;
  }


  @Output()
  valueChanged: EventEmitter< string | undefined | null> = new EventEmitter();

  @Output()
  iconButtonClicked: EventEmitter< any | undefined | null> = new EventEmitter();

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.input.addEventListener('on:change', (state: CustomEvent) => {

      const {  value } = state.detail.data;
      console.log(state.detail.data.value);
      this.value = value.value;

    });

    this.input.addEventListener('on:trailingIconClick', (state: CustomEvent) => {
      console.log(state.composed);
      this.iconButtonClicked.emit(state);
    });
    this.cdr.detectChanges();
  }


  // eslint-disable-next-line @typescript-eslint/member-ordering
  onChange: (newValue?: string | null) => void;

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(handler: (newValue?: string | null | undefined) => void): void {
    this.onChange = handler;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  onTouched: () => void;
  registerOnTouched(handler: () => void): void {
    this.onTouched = handler;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
