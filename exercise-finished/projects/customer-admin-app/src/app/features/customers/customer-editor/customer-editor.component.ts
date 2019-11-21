import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Customer } from '../model/customers';
import { CustomersBackendService } from '../services/customers-backend.service';

const NEW_CUSTOMER: Partial<Customer> = {
  name: '',
  surname: '',
  isVip: false,
  lifetimeOrderValue: 0,
  tags: [],
  birthday: '',
  address: {
    continent: '',
    land: '',
    location: '',
  },
};

@Component({
  selector: 'my-org-customer-editor',
  templateUrl: './customer-editor.component.html',
  styleUrls: ['./customer-editor.component.scss'],
})
export class CustomerEditorComponent implements OnInit {
  customer: Observable<Partial<Customer>>;

  customerForm: FormGroup;

  private isNewCustomer = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customersBackendService: CustomersBackendService,
  ) {}

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      isVip: [false],
      address: this.fb.group({
        location: ['', [Validators.required]],
        land: ['', [Validators.required]],
        continent: ['', [Validators.required, Validators.minLength(3)]],
      }),
      tags: [[]],
    });

    this.customer = this.activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      tap(id => (this.isNewCustomer = !id)),
      switchMap((id: string) =>
        id ? this.customersBackendService.get(parseInt(id, 10)) : of(NEW_CUSTOMER),
      ),
      tap(customer => this.customerForm.patchValue({ ...customer })),
    );
  }

  submit(customer: Customer) {
    if (!this.customerForm.valid) {
      this.customerForm.markAllAsTouched();
      return;
    }
    const customerPayload = {
      ...customer,
      ...this.customerForm.getRawValue(),
    };

    if (this.isNewCustomer) {
      this.customersBackendService
        .create(customerPayload)
        .subscribe(() => this.navigateToCustomerOverview());
    } else {
      this.customersBackendService
        .update(customerPayload)
        .subscribe(() => this.navigateToCustomerOverview());
    }
  }

  reset(customer: Customer) {
    this.customerForm.reset(customer);
  }

  addTag(tag: string) {
    const tags = this.customerForm.getRawValue().tags;
    this.customerForm.patchValue({ tags: [...tags, tag] });
  }

  removeTag(tag: string) {
    const tags = this.customerForm.getRawValue().tags;
    this.customerForm.patchValue({ tags: tags.filter(t => t !== tag) });
  }

  private navigateToCustomerOverview() {
    this.router.navigate([this.isNewCustomer ? '../' : '../../'], {
      relativeTo: this.activatedRoute,
    });
  }
}
