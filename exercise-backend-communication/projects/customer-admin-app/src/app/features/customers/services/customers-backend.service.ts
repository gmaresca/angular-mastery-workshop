import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import { NotificationService } from '../../../core/notification/notification.service';

import { Customer } from '../model/customers';

export const RESOURCE_URL = `${environment.API_URL}/customers`;

@Injectable()
export class CustomersBackendService {
  customers: Observable<Customer[]>;

  constructor(private httpClient: HttpClient, private notificationService: NotificationService) {
    // DONE 2: create stream of all customers using http client get method (make request to RESOURCE_URL)
    // and use shareReplay RxJs operator with "bufferSize: 1" and "refCount: true" options, the stream should be stored in this.customers instance variable
    this.customers = this.httpClient
      .get<Customer[]>(RESOURCE_URL)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  findCustomers(query: string): Observable<Customer[]> {
    // DONE 3: make and return get request using http client
    //  make request to RESOURCE_URL with query param "q" with the value of the "query" argument passed in the method
    // (try using Javascript template string - back ticks and ${} syntax to print value of the variable)
    return this.httpClient.get<Customer[]>(`${RESOURCE_URL}?q=${query}`);
    //return of([]); // remove this when you provide real implementation
  }

  get(id: number): Observable<Customer> {
    // DONE 4: make and return get request using http client
    // make request to RESOURCE_URL followed by the "id" as path param
    return this.httpClient.get<Customer>(`${RESOURCE_URL}?id=${id}`);
  }

  update(customer: Customer): Observable<Customer> {
    // DONE 5: make and return put request using http client
    // make request to RESOURCE_URL followed by the "id" as path param ( get ID from the customer object ) and pass
    // in customer object as data payload to be sent to the backend
    // use .pipe(tap()) to perform side-effect which will create info notification that customer was updated in case of successful request
    // (hint: use this.notificationService)
    return this.httpClient.put<Customer>(`${RESOURCE_URL}?id=${customer.id}`, customer)
      .pipe(tap(() => this.notificationService.info(`User: ${customer.name} ${customer.surname} has been updated`, 2000)));
    //return of({} as any); // remove this when you provide real implementation
  }

  remove(id: number): Observable<void> {
    // DONE 6: make and return delete request using http client
    // make request to RESOURCE_URL followed by the "id" as path param
    // use .pipe(tap()) to perform side-effect which will create info notification that customer was removed in case of successful request
    // (hint: use this.notificationService)
    return this.httpClient.delete<void>(`${RESOURCE_URL}?id=${id}`)
    .pipe(tap(() => this.notificationService.info(`Cusotmer ${id} deleted`, 2000)));
      
  }
}
