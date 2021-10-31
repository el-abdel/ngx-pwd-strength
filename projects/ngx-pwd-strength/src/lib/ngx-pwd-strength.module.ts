import {NgModule} from '@angular/core';
import {NgxPwdStrengthComponent} from './ngx-pwd-strength.component';
import {NgxPwdStrengthDirective} from './ngx-pwd-strength.directive';
import {NgxPwdStrengthService} from "./ngx-pwd-strength.service";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    NgxPwdStrengthComponent,
    NgxPwdStrengthDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxPwdStrengthDirective
  ],
  providers: [NgxPwdStrengthService],
  entryComponents: [
    NgxPwdStrengthComponent
  ]
})
export class NgxPwdStrengthModule { }
