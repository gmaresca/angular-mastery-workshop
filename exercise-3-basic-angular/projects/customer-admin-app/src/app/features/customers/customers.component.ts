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
    birthday: '1995-07-02T00:00:00.000Z',
    isVip: true,
    orders: [1240, 340, 120]
  },
  {
    id: 2,
    name: 'Daenerys',
    surname: 'Targaryen',
    birthday: '1996-11-30T00:00:00.000Z',
    orders: [100, 10000, 25]
  },
  {
    id: 3,
    name: 'Sansa',
    surname: 'Stark',
    birthday: '1999-05-07T00:00:00.000Z',
    orders: [4500, 50]
  },
  {
    id: 4,
    name: 'Tyrion',
    surname: 'Lannister',
    birthday: '1980-09-02T00:00:00.000Z',
    orders: [150000, 25000]
  },
  {
    id: 5,
    name: 'Cersei',
    surname: 'Lannister',
    birthday: '1976-03-18T00:00:00.000Z',
    orders: [1000000, 10000000, 50000]
  },
];
