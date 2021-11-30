import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef, CUSTOM_ELEMENTS_SCHEMA, NgModule, ContentChildren, QueryList } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WCDropdownItemComponent } from '../goa-dropdown-item/goa-dropdown-item.component';
import 'goa-web-components'


@Component({
  selector: 'goa-ng-dropdown',
  templateUrl: './goa-dropdown.component.html',
  styleUrls: ['./goa-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WCDropdownComponent),
      multi: true
    },
  ]
})

export class WCDropdownComponent implements ControlValueAccessor {

  @ViewChild('goaWcDropdown')
  private inputElement: ElementRef<HTMLInputElement>;

  private get input() {
    return this.inputElement?.nativeElement;
  }

  /**
  * All options.
  * @ignore
  */
  @ContentChildren(WCDropdownItemComponent, { descendants: true }) allOptions: QueryList<WCDropdownItemComponent>;


  @Input()
  set name(value: string) {
    if (value === undefined || value === null) {
      throw new TypeError(`Input name is required.`);
    }
    this._name = value;
  }
  get name(): string {
    return this._name;
  }

  private _name: string;

  @Input()
  selectedValues: string[];

  @Output()
  valueChanged: EventEmitter<string[] | undefined | null> = new EventEmitter();

  ngAfterViewInit() {
    this.allOptions.forEach(a => a.name = this._name);

  }

  handleInput(event: InputEvent) {

  }

  // CONTROL VALUE ACCESSOR INTERFACE
  writeValue(values: string[]): void {
    this.selectedValues = values;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  onChange: (newValue?: number | null) => void;
  registerOnChange(handler: (newValue?: number | null) => void): void {
    this.onChange = handler;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  onTouched: () => void;
  registerOnTouched(handler: () => void): void {
    this.onTouched = handler;
  }

}
