import { ElementRef } from '@angular/core';

import { CoinDirective } from './coin.directive';

class MockElementRef implements ElementRef {
  nativeElement = {
    style: {},
  } as any;
}

describe('CoinDirective', () => {
  let mockElementRef: MockElementRef;

  beforeEach(() => {
    mockElementRef = new MockElementRef();
  });

  it('should create an instance', () => {
    const directive = new CoinDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
  it('should set style on element', () => {
    const directive = new CoinDirective(mockElementRef);
    expect(directive).toBeTruthy();
    expect(mockElementRef.nativeElement.style.textAlign).toBe('right');
  });
});
