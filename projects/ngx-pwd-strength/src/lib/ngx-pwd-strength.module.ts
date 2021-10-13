import { NgModule } from '@angular/core';
import { NgxPwdStrengthComponent } from './ngx-pwd-strength.component';
import { NgxPwdStrengthDirective } from './ngx-pwd-strength.directive';



@NgModule({
  declarations: [
    NgxPwdStrengthComponent,
    NgxPwdStrengthDirective
  ],
  imports: [
  ],
  exports: [
    NgxPwdStrengthComponent
  ]
})
export class NgxPwdStrengthModule { }
