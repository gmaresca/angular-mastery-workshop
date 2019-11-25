import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import { ReactiveNotificationService } from '../../../core/notification/reactive-notification.service';

import { Customer } from '../model/customers';

export const RESOURCE_URL = `${environment.API_URL}/customers`;

@Injectable()
export class CustomersBackendService {
  customers: Observable<Customer[]>;

  constructor(
    private httpClient: HttpClient,
    private notificationService: ReactiveNotificationService,
  ) {
    this.customers = this.httpClient
      .get<Customer[]>(RESOURCE_URL)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  findCustomers(query: string): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${RESOURCE_URL}?q=${query}`);
  }

  get(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${RESOURCE_URL}/${id}`);
  }

  create(customer: Partial<Customer>): Observable<Customer> {
    return this.httpClient
      .post<Customer>(RESOURCE_URL, customer)
      .pipe(tap(() => this.notificationService.info('Customer created')));
  }

  update(customer: Customer): Observable<Customer> {
    return this.httpClient
      .put<Customer>(`${RESOURCE_URL}/${customer.id}`, customer)
      .pipe(tap(() => this.notificationService.info('Customer updated')));
  }

  remove(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${RESOURCE_URL}/${id}`)
      .pipe(tap(() => this.notificationService.warning('Customer removed')));
  }
}
