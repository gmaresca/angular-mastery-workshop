import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Customer } from '../model/customers';
import { CustomersBackendService } from '../services/customers-backend.service';

@Component({
  selector: 'my-org-customer-editor',
  templateUrl: './customer-editor.component.html',
  styleUrls: ['./customer-editor.component.scss'],
})
export class CustomerEditorComponent implements OnInit {
  customer: Observable<Customer>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customersBackendService: CustomersBackendService,
  ) {}

  ngOnInit() {
    this.customer = this.activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      switchMap(id => this.customersBackendService.get(parseInt(id, 10))),
    );
  }
}
