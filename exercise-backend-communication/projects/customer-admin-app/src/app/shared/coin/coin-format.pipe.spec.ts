import { CoinFormatPipe } from './coin-format.pipe';

describe('CoinFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new CoinFormatPipe();
    expect(pipe).toBeTruthy();
  });
  it('formats the coin amount', () => {
    const pipe = new CoinFormatPipe();
    expect(pipe.transform(10000000)).toBe('10 000 000.00');
  });
});
