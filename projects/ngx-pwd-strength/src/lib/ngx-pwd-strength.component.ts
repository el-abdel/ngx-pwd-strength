import {Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {NgxPwdStrengthService} from "./ngx-pwd-strength.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'lib-ngx-pwd-strength',
  templateUrl:'./lib-ngx-pwd-strength.compoent.html',
  host: { class: "ngx-pwd-strength-popup" },
  styles: [
  ]
})
export class NgxPwdStrengthComponent implements OnInit, OnDestroy {

  display: boolean = false;
  score: number = 0;
  subscription!: Subscription;
  @Input() data: any;
  @HostBinding("style.top") hostStyleTop!: string;
  @HostBinding("style.left") hostStyleLeft!: string;
  constructor(
    private ngxPwdStrengthService: NgxPwdStrengthService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.subscription = this.ngxPwdStrengthService.updatedScore$.subscribe(data => this.score = data);
  }

  @Input() set show(value: boolean) {
    if (value) {
      this.setPosition();
    }
    this.display = value;
  }

  get show(): boolean {
    return this.display;
  }

  get placement(): string {
    return 'bottom';
  }

  get element() {
    return this.data.element;
  }

  get elementPosition(): DOMRect {
    return this.data.elementPosition;
  }

  get popupOffset(): number {
    return 8;
  }

  setPosition(): void {
    if (this.setHostStyle(this.placement)) {
      this.setPlacementClass(this.placement);

      return;
    } else {
      // Is popup outside the visible area
      const placements = ["top", "right", "bottom", "left"];
      let isPlacementSet;

      for (const placement of placements) {
        if (this.setHostStyle(placement)) {
          this.setPlacementClass(placement);
          isPlacementSet = true;

          return;
        }
      }

      // Set original placement
      if (!isPlacementSet) {
        this.setHostStyle(this.placement);
        this.setPlacementClass(this.placement);
      }
    }
  }

  setHostStyle(placement: string): boolean {
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

    switch (placement) {
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

    return true;
  }

  setPlacementClass(placement: string): void {
    this.renderer.addClass(this.elementRef.nativeElement, "popup-" + placement);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
