import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CustomersBackendService, RESOURCE_URL } from './customers-backend.service';

describe('CustomersBackendService', () => {
  let service: CustomersBackendService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomersBackendService],
    });

    service = TestBed.get(CustomersBackendService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should load customer', () => {
    const MOCK_CUSTOMER = { id: 0, name: 'John', surname: 'Snow' };

    service.get(0).subscribe(customer => {
      expect(customer).toEqual(MOCK_CUSTOMER);
    });

    const req = httpTestingController.expectOne(`${RESOURCE_URL}/0`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_CUSTOMER);
  });
});
