import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CustomersBackendService, RESOURCE_URL } from './customers-backend.service';
import { NotificationService } from '../../../core/notification/notification.service';
import { ReactiveNotificationService } from '../../../core/notification/reactive-notification.service';

describe('CustomersBackendService', () => {
  let service: CustomersBackendService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: NotificationService, useClass: ReactiveNotificationService},
        CustomersBackendService,
      ],
    });

    // run tests using "npm run watch" and use "fdescribe" instead of "describe" at the top of this file to only run this test
    // TODO 7: Use the "TestBed" to get instance of "CustomersBackendService" and store it in the "service" variable
    // TODO 8: Use the "TestBed" to get instance of "HttpTestingController" and store it in the "service" httpTestingController
  });

  afterEach(() => {
    // TODO 9: add "httpTestingController.verify()" expression to run after each test
  });

  it('should load customer', () => {
    const MOCK_CUSTOMER = { id: 0, name: 'John', surname: 'Snow' };

    service.get(0).subscribe(customer => {
      // TODO 10: add expectation that the received "customer" will equal to the "MOCK_CUSTOMER"
    });

    // TODO 11: what kind of url shoudl be called when we're trying to get customer with id 0 from the "RESOURCE_URL" resource? (put it as a string in place of <replace-this>)
    const req = httpTestingController.expectOne('<replace-this>');
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_CUSTOMER);
  });
});
