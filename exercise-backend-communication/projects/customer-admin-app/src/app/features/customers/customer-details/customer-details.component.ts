import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { Customer } from '../model/customers';
import { CustomersBackendService } from '../services/customers-backend.service';

@Component({
  selector: 'my-org-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  private reloadTrigger = new Subject<void>();

  customer: Observable<Customer>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customersBackendService: CustomersBackendService,
  ) {}

  ngOnInit() {
    this.customer = combineLatest([
      this.activatedRoute.paramMap,
      this.reloadTrigger.asObservable().pipe(startWith('init')),
    ]).pipe(
      map(([paramMap]) => paramMap.get('id')),
      switchMap(id => this.customersBackendService.get(parseInt(id, 10))),
    );
  }

  addTag(tagToAdd: string, customer: Customer) {
    // optimistic update (immediately add tag to UI, remove it in case of error later...)
    customer.tags = [...customer.tags, tagToAdd];
    this.customersBackendService.update(customer).subscribe({
      error: () => (customer.tags = customer.tags.filter(tag => tag !== tagToAdd)), // remove tag in case of error
    });
  }

  removeTag(tagToRemove: string, customer: Customer) {
    // pessimistic update (only remove tag from UI after backend request was successful)
    const updatedCustomer = {
      ...customer,
      tags: customer.tags.filter(tag => tag !== tagToRemove),
    };
    this.customersBackendService.update(updatedCustomer).subscribe(() => this.reloadTrigger.next());
  }
}
