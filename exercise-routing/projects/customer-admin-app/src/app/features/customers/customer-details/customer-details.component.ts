import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of, Subject } from 'rxjs';
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
    // TODO 8: inject "activatedRoute" of type "ActivatedRoute"
    private customersBackendService: CustomersBackendService,
  ) {}

  ngOnInit() {
    // TODO 9: use "paramMap" stream of the "activatedRoute"
    // map (RxJs operator) it into "id" (from the "paramMap") and then
    // switchMap (RxJs operator) the "id" into "customersBackendService.get" requests
    this.customer = undefined;

    // TODO 10: OPTIONAL: use combineLatest (RxJs creation operator) to combine original "paramMap" stream
    // with stream of "this.reloadTrigger" (ignore the trigger value, used just for triggering)
    // to reload customer when adding or removing tags to the backend...
    // it will need to be piped with "startWith" operator to trigger initial load

    // TODO 11: use Angular Schematics to generate "Auth" guard in customers feature ( features/customers/auth )
    // for "CanActivate" check...
    // inside of  new guard file, inject "AuthService" and use "isAdmin" method
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
