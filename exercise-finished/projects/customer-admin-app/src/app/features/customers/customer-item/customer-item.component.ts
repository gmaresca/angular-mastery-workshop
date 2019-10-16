import { Component, Input, OnInit } from '@angular/core';

import { Customer } from '../model/customers';

@Component({
  selector: 'my-org-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss'],
})
export class CustomerItemComponent implements OnInit {
  @Input() customer: Customer;

  constructor() {}

  ngOnInit() {}
}
