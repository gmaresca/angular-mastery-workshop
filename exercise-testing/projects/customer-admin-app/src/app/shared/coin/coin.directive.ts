import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[myOrgCoin]',
})
export class CoinDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.textAlign = 'right';
  }
}
