import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Customer } from '../model/customers';
import { CustomersBackendService } from '../services/customers-backend.service';

@Component({
  selector: 'my-org-customer-editor',
  templateUrl: './customer-editor.component.html',
  styleUrls: ['./customer-editor.component.scss'],
})
export class CustomerEditorComponent implements OnInit {
  customer: Observable<Customer>;

  customerForm: FormGroup;

  constructor(
    // TODO 2: inject "FormBuilder"
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customersBackendService: CustomersBackendService,
  ) {}

  ngOnInit() {
    // TODO 3: use form builder to define reactive form using form "group"
    // implement form for every property of "Customer" interface (besides "id")
    // property is implemented using as "<some-property: [<default-value>, [<validators>]]>", hint: most default values will be empty string or boolean value
    // the from group can have property which is also form group (for nested objects, eg "address")
    this.customerForm = undefined;

    // TODO 4: most string values should use "required" validator (from "Validators"), feel free to experiment with other built in validators
    // hint: required validator is just a property NOT a funtion (as you might get it by the IDE code completion)

    // next TODO items can be found in "customer-editor.component.html" file

    this.customer = this.activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      switchMap((id: string) => this.customersBackendService.get(parseInt(id, 10))),
      // TODO 13: created form starts with default values but we want to edit existing customer
      // we have to use retrieved "customer" value (from backend) and feed it to the form
      // use "tap" RxJs operator (to perform side-effect) and pass customer into "customerForm" using "patchValue" method
      // check running application (form should be populated using customer data)
    );
  }

  submit(customer: Customer) {
    // TODO 19: use form "valid" property to NOT submit form when the form is invalid
    // it is also nice to highlight all invalid fields using form "markAllAsTouched()" method
    // try to edit customer and see difference by navigating to customer details or reloading page
    // last todo is back in the "customer-editor.component.html"
    if (true) {
      return;
    }

    this.customersBackendService
      .update({
        ...customer,
        ...this.customerForm.getRawValue(),
      })
      .subscribe(() => this.navigateToCustomerOverview());
  }

  reset(customer: Customer) {
    // TODO 18: use form "reset" method to reset touched / dirty state and to pass in original customer (from backend) to reset from value
  }

  addTag(tag: string) {
    // TODO 14: retrieve current "tags" value from form using "getRawValue()" method
    const tags = undefined;

    // TODO 15: use form "patchValue" method to pass in new tags which will be old tags with new tag item
    // hint: use array spread operator to spread old tags and new tag into new array
  }

  removeTag(tag: string) {
    // TODO 16: retrieve current "tags" value from form using "getRawValue()" method
    const tags = undefined;

    // TODO 17: use form "patchValue" method to pass in new tags which will be old tags without the removed tag
    // hint: use array filter method which is immutable, creates new array
    // try playing with tags component
  }

  private navigateToCustomerOverview() {
    this.router.navigate(['../../'], {
      relativeTo: this.activatedRoute,
    });
  }
}
