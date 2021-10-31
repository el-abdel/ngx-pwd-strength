import {Component, ElementRef, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {NgxPwdStrengthService} from "./ngx-pwd-strength.service";
import {Subscription} from "rxjs";
import {PwdScore} from "./types";

@Component({
  selector: 'lib-ngx-pwd-strength',
  templateUrl:'./lib-ngx-pwd-strength.component.html',
  host: { class: "ngx-pwd-strength-popup" },
  styleUrls: [
    './lib-ngx-pwd-strength.component.scss'
  ]
})
export class NgxPwdStrengthComponent implements OnInit, OnDestroy {

  display: boolean = false;
  pwdScore: PwdScore | null = null;
  subscription!: Subscription;
  popupOffset: number = 5;
  popupPosition: string = "bottom";
  @Input() data: any;
  @HostBinding("style.top") hostStyleTop!: string;
  @HostBinding("style.left") hostStyleLeft!: string;
  constructor(
    private ngxPwdStrengthService: NgxPwdStrengthService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.subscription = this.ngxPwdStrengthService.updatedScore$.subscribe(data => {
      this.pwdScore = data
    });
  }

  @Input() set show(value: boolean) {
    if (value) {
      this.setHostPosition(this.popupPosition);
    }
    this.display = value;
  }

  get show(): boolean {
    return this.display;
  }

  get element() {
    return this.data.element;
  }

  get elementPosition(): DOMRect {
    return this.data.elementPosition;
  }

  setHostPosition(position: string): void {
    const isSvg = this.element instanceof SVGElement;
    const popup = this.elementRef.nativeElement;
    const isCustomPosition = !this.elementPosition.right;

    let elementHeight = isSvg ? this.element.getBoundingClientRect().height : this.element.offsetHeight;
    let elementWidth = isSvg ? this.element.getBoundingClientRect().width : this.element.offsetWidth;
    const popupHeight = popup.clientHeight;
    const popupWidth = popup.clientWidth;
    const scrollY = window.pageYOffset;

    if (isCustomPosition) {
      elementHeight = 0;
      elementWidth = 0;
    }

    let topStyle;
    let leftStyle;

    switch (position) {
      case "top":
        topStyle = (this.elementPosition.top + scrollY) - (popupHeight + this.popupOffset);
        leftStyle = this.elementPosition.left;
        break;
      case "bottom":
        topStyle = (this.elementPosition.top + scrollY) + elementHeight + this.popupOffset;
        leftStyle = this.elementPosition.left;
        break;
      case "left":
        leftStyle = this.elementPosition.left - popupWidth - this.popupOffset;
        topStyle = (this.elementPosition.top + scrollY);
        break;
      case "right":
        leftStyle = this.elementPosition.left + elementWidth + this.popupOffset;
        topStyle = (this.elementPosition.top + scrollY);
    }

    this.hostStyleTop = topStyle + "px";
    this.hostStyleLeft = leftStyle + "px";
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
