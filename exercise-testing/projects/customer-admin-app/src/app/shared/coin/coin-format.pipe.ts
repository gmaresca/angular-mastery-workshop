import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coinFormat',
})
export class CoinFormatPipe implements PipeTransform {
  transform(value?: number): string {
    if (value === null || value === undefined) {
      return '0.00';
    } else {
      return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
    }
  }
}
