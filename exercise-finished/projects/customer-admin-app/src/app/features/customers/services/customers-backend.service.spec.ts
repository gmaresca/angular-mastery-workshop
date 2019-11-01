import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CustomersBackendService } from './customers-backend.service';
import { NotificationService } from '../../../core/notification/notification.service';
import { ReactiveNotificationService } from '../../../core/notification/reactive-notification.service';

describe('CustomersBackendService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: NotificationService, useClass: ReactiveNotificationService },
        CustomersBackendService,
      ],
    }),
  );

  it('should be created', () => {
    const service: CustomersBackendService = TestBed.get(CustomersBackendService);
    expect(service).toBeTruthy();
  });
});
