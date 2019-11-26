import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material';
import { Observable } from 'rxjs';
import { debounceTime, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';

import { Customer } from './model/customers';
import { CustomersBackendService } from './services/customers-backend.service';

@Component({
  selector: 'my-org-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  loading = true;
  searchForm: FormGroup;

  customers: Observable<Customer[]>;

  @ViewChild('queryInput', { static: true, read: MatInput }) queryInput: MatInput;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customersBackendService: CustomersBackendService,
  ) {}

  ngOnInit() {
    const initialQuery = this.activatedRoute.snapshot.queryParams.query || '';

    this.searchForm = this.fb.group({
      query: [''],
    });

    this.searchForm.patchValue({ query: initialQuery });

    this.customers = this.searchForm.get('query').valueChanges.pipe(
      startWith(initialQuery),
      tap(query => {
        this.loading = true;
        this.router.navigate([], query.length ? { queryParams: { query } } : {});
      }),
      debounceTime(300),
      switchMap(query => this.customersBackendService.findCustomers(query)),
      tap(() => (this.loading = false)),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.queryInput.focus();
  }

  resetSearchQuery() {
    this.searchForm.patchValue({ query: '' });
  }

  removeCustomer(customer: Customer) {
    this.customersBackendService.remove(customer.id).subscribe(() => this.refreshCustomers());
  }

  private refreshCustomers() {
    this.searchForm.patchValue({ query: this.searchForm.getRawValue().query });
  }
}
