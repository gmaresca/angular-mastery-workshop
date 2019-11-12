import { Component, OnInit } from '@angular/core';

import { Customer } from './model/customers';

@Component({
  selector: 'my-org-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers: Customer[];

  ngOnInit() {
    this.customers = MOCK_CUSTOMERS;
  }
}

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: 'John',
    surname: 'Snow',
    isVip: true,
    orders: [1240, 340, 120],
  },
  {
    id: 2,
    name: 'Daenerys',
    surname: 'Targaryen',
    orders: [100, 10000, 25],
  },
  {
    id: 3,
    name: 'Sansa',
    surname: 'Stark',
    orders: [4500, 50],
  },
  {
    id: 4,
    name: 'Tyrion',
    surname: 'Lannister',
    orders: [150000, 25000],
  },
  {
    id: 5,
    name: 'Cersei',
    surname: 'Lannister',
    orders: [1000000, 10000000, 50000],
  },
];
