import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Customer } from './model/customers';
import { CustomersBackendService } from './services/customers-backend.service';

@Component({
  selector: 'my-org-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers: Observable<Customer[]>;

  constructor(private customersBackendService: CustomersBackendService) {}

  ngOnInit() {
    this.customers = this.customersBackendService.customers;
  }
}
