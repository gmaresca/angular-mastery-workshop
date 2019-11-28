import { Purchase } from './../model/purchase';
import { OrderService } from './../services/order.service';
import { Subject } from 'rxjs';
import { Customer } from './../model/customers';
import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'my-org-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss']
})
export class CustomerItemComponent implements OnInit, OnChanges {

  @Input() customer: Customer;
  @Output() purchase: Purchase = { customerId: 0, order: 0 };
  subject$: Subject<Purchase> = new Subject<Purchase>();


  //Subject<Purchase> = new Subject<Purchase>();
  public totalOrderValue: number = 0;

  constructor(private order: OrderService) {
    console.log('Constr purchase', this.purchase);
    this.subject$.subscribe({
      next: (p) => {
        p.order = Math.ceil(Math.random() * 1000); this.purchase = p
      }
    });
  }

  ngOnInit() {
    console.log("Init", this.customer);
  }

  ngOnChanges() {
    this.totalOrderValue = this.order.calculateTotal(this.customer.orders);
  }

  sayHello() {
    console.log(`Hello ${this.customer.name} ${this.customer.surname}!`);
  }

  purchaseItem(): Purchase {
    this.subject$.next({ customerId: this.customer.id, order: 0 });
    return this.purchase;
  }



}
