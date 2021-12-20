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
import { WCBadgeComponent } from './goa-badge/goa-badge.component';
import { WCButtonGroupComponent } from './goa-button-group/goa-button-group.component';
import { WCCalloutComponent } from './goa-callout/goa-callout.component';
import { WCCardComponent } from './goa-card/goa-card.component';
import { WCCardActionsComponent } from './goa-card/goa-card-actions/goa-card-actions.component';
import { WCCardContentComponent } from './goa-card/goa-card-content/goa-card-content.component';
import { WCCardImageComponent } from './goa-card/goa-card-image/goa-card-image.component';
import { GoaCardGroupComponent } from './goa-card-group/goa-card-group.component';

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
    WCBadgeComponent,
    WCButtonGroupComponent,
    WCCalloutComponent,
    WCCardComponent,
    WCCardActionsComponent,
    WCCardContentComponent,
    WCCardImageComponent,
    GoaCardGroupComponent,
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
    WCBadgeComponent,
    WCButtonGroupComponent,
    WCCalloutComponent,
    WCCardComponent,
    WCCardActionsComponent,
    WCCardContentComponent,
    WCCardImageComponent,
    GoaCardGroupComponent,
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
