import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoABadgeComponent } from './badge/badge.component';
import { GoAAppVersionHeaderComponent } from './app-version-header/app-version-header.component';
import { GoANumberInputComponent } from './number-input/number-input.component';
import { AngularComponentsModule } from '../lib/angular-components.module';
import { WCDropdownComponent } from './goa-dropdown/goa-dropdown.component';
import { WCDropdownItemComponent } from './goa-dropdown-item/goa-dropdown-item.component';
import { WCContainerComponent } from './goa-container/goa-container.component';
import { WCButtonComponent } from './goa-button/goa-button.component';
//import {  defineCustomElements } from "ionicons/dist/loader";
import { WCIconComponent } from './goa-icon/goa-icon.component';
import { WCIconButtonComponent } from './goa-icon-button/goa-icon-button.component';
import { WCInputComponent } from './goa-input/goa-input.component';

@NgModule({
  imports: [
    CommonModule,
    AngularComponentsModule
  ],
  exports: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
    GoANumberInputComponent,
    WCDropdownComponent,
    WCDropdownItemComponent,
    WCContainerComponent,
    WCButtonComponent,
    WCIconComponent,
    WCIconButtonComponent,
    WCInputComponent,
  ],
  declarations: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
    GoANumberInputComponent,
    WCDropdownComponent,
    WCDropdownItemComponent,
    WCContainerComponent,
    WCButtonComponent,
    WCIconComponent,
    WCIconButtonComponent,
    WCInputComponent,
  ],
  providers: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ExperimentalComponentsModule { }

//https://github.com/ionic-team/ionicons/issues/769
// defineCustomElements(window, {
//   resourcesUrl: "assets/ionicons/"
// });
