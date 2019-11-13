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
    // TODO 2: create stream of all customers using http client get method (make request to RESOURCE_URL)
    // and use shareReplay RxJs operator with "bufferSize: 1" and "refCount: true" options, the stream should be stored in this.customers instance variable
  }

  findCustomers(query: string): Observable<Customer[]> {
    // TODO 3: make and return get request using http client
    //  make request to RESOURCE_URL with query param "q" with the value of the "query" argument passed in the method
    // (try using Javascript template string - back ticks and ${} syntax to print value of the variable)
    return of([]); // remove this when you provide real implementation
  }

  get(id: number): Observable<Customer> {
    // TODO 4: make and return get request using http client
    // make request to RESOURCE_URL followed by the "id" as path param
    return of({} as any); // remove this when you provide real implementation
  }

  update(customer: Customer): Observable<Customer> {
    // TODO 5: make and return put request using http client
    // make request to RESOURCE_URL followed by the "id" as path param ( get ID from the customer object ) and pass
    // in customer object as data payload to be sent to the backend
    // use .pipe(tap()) to perform side-effect which will create info notification that customer was updated in case of successful request
    // (hint: use this.notificationService)
    return of({} as any); // remove this when you provide real implementation
  }

  remove(id: number): Observable<void> {
    // TODO 6: make and return delete request using http client
    // make request to RESOURCE_URL followed by the "id" as path param
    // use .pipe(tap()) to perform side-effect which will create info notification that customer was removed in case of successful request
    // (hint: use this.notificationService)
    return of({} as any); // remove this when you provide real implementation
  }
}
