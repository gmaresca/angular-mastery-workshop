import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor() { }

  calculateTotal(orders: Array<number>) {
    return orders.reduce(o => o++);
  }
}
