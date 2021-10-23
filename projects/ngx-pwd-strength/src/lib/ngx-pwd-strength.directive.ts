import {
  ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef, EmbeddedViewRef,
  HostListener,
  Injector
} from '@angular/core';
import {DOMRect, HostComponent} from "./types";
import {NgxPwdStrengthComponent} from "./ngx-pwd-strength.component";
import {NgxPwdStrengthService} from "./ngx-pwd-strength.service";

@Directive({
  selector: 'input[type=password][ngxPwdStrength]',
  exportAs: 'ngxPwdStrength'
})

export class NgxPwdStrengthDirective {
  /*
   * Password must be atleast 12 characters long (10 pts)                      => /^(.){12,}$/
   * Password must contain atleast a lowercase letter (5 pts)                  => /^(?=.*[a-z])(.*)$/
   * Password must contain atleast an uppercase letter (5 pts)                 => /^(?=.*[A-Z])(.*)$/
   * Password must contain atleast a digit (5 pts)                             => /^(?=.*[0-9])(.*)$/
   * Password must contain atleast a symbol (10 pts)                           => /^(?=.*[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#])([a-zA-Z0-9-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]*)$/
   * Password must contain atleast 5 unique characters (5 pts)                 => /(?:(.)(?<=^(?:(?!\1).)*\1)(?=(?:(?!\1).)*$).*?){5,}/
   * --------------------------------------------------------------------------------------
   * str = 'abdellahb';
   * const data = str.split('');
   * const map = data.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
   * const filtered = [...map.entries()].filter(([key, value]) => value === 1);
   * --------------------------------------------------------------------------------------
   * */

  regexLength = /^(.){12,}$/;
  regexAtleastLowercase = /^(?=.*[a-z])(.*)$/;
  regexAtleastLUpperercase = /^(?=.*[A-Z])(.*)$/;
  regexAtleastLDigit = /^(?=.*[0-9])(.*)$/;
  regexAtleastLSymbole = /^(?=.*[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#])([a-zA-Z0-9-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]*)$/;
  regexAtleastUniqueCharacters = /(?:(.)(?<=^(?:(?!\1).)*\1)(?=(?:(?!\1).)*$).*?){5,}/;

  hostPosition!: DOMRect;
  componentRef: any;

  constructor(
    private ngxPwdStrengthService: NgxPwdStrengthService,
    private elementRef: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  get isPopupDestroyed(): boolean {
    return this.componentRef && this.componentRef.hostView.destroyed;
  }
  getHostPosition(): void {
    this.hostPosition = this.elementRef.nativeElement.getBoundingClientRect();
  }

  @HostListener("focusin", ["$event.target.value"])
  onMouseEnter(value: any): void {
    this.displayPopup();
    this.ratePassword(value);
  }

  @HostListener("input", ["$event.target.value"])
  onInput(value: string): void {
    this.ratePassword(value);
  }

  @HostListener("focusout")
  onMouseLeave(): void {
    this.destroyPopup();
  }

  ratePassword(password: string) {
    let score = 0;
    let matches = 0;
    if(this.regexLength.test(password)) {
      score += 10;
      matches++;
    }
    if(this.regexAtleastLowercase.test(password)) {
      score += 5;
      matches++;
    }
    if(this.regexAtleastLUpperercase.test(password)) {
      score += 5;
      matches++;
    }
    if(this.regexAtleastLDigit.test(password)) {
      score += 5;
      matches++;
    }
    if(this.regexAtleastLSymbole.test(password)) {
      score += 5;
      matches++;
    }
    if(this.regexAtleastUniqueCharacters.test(password)) {
      score += 10;
      matches++;
    }

    this.ngxPwdStrengthService.updateScore(score + matches * 10);
  }

  displayPopup(): void {
    if (!this.componentRef || this.isPopupDestroyed) {
      this.buildPopup();
    }
  }

  buildPopup(): void {
    this.getHostPosition();
    this.loadComponent(NgxPwdStrengthComponent);
  }

  loadComponent(component: any): void {
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);
    const hostComponent = this.componentRef.instance as HostComponent;
    hostComponent.data = {
      element: this.elementRef.nativeElement,
      elementPosition: this.hostPosition
    };

    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    hostComponent.show = true;
  }

  destroyPopup(): void {
    if (!this.isPopupDestroyed) {
      (this.componentRef.instance as HostComponent).show = false;
      if (!this.componentRef || this.isPopupDestroyed) {
        return;
      }
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }
  }

}
