import { FormBuilder, FormGroup } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, startWith, switchMap, tap } from 'rxjs/operators';

import { Customer } from './model/customers';
import { CustomersBackendService } from './services/customers-backend.service';

@Component({
  selector: 'my-org-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit, AfterViewInit {
  loading = true;
  searchForm: FormGroup;

  customers: Observable<Customer[]>;

  @ViewChild('queryInput', { static: false }) queryInput: ElementRef;

  constructor(private fb: FormBuilder, private customersBackendService: CustomersBackendService) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      query: [''],
    });

    this.customers = this.searchForm.get('query').valueChanges.pipe(
      startWith(''),
      tap(() => (this.loading = true)),
      debounceTime(300),
      switchMap(query => this.customersBackendService.findCustomers(query)),
      tap(() => (this.loading = false)),
    );
  }

  ngAfterViewInit() {
    console.log(this.queryInput);
    this.queryInput.nativeElement.focus();
  }

  resetSearchQuery() {
    this.searchForm.patchValue({ query: '' });
  }
}
