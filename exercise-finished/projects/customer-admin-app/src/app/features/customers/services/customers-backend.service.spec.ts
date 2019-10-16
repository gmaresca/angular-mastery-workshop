import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CustomersBackendService } from './customers-backend.service';

describe('CustomersBackendService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomersBackendService],
    }),
  );

  it('should be created', () => {
    const service: CustomersBackendService = TestBed.get(CustomersBackendService);
    expect(service).toBeTruthy();
  });
});
