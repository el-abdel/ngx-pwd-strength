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
    if(password) {
      let score = this.ngxPwdStrengthService.getScoreWithFeedback(password);
      this.ngxPwdStrengthService.updateScore(score);
    } else {
      this.ngxPwdStrengthService.updateScore(null);
    }
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
