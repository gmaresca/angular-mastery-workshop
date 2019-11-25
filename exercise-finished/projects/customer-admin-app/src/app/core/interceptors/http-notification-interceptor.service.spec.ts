import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { HttpNotificationInterceptor } from './http-notification-interceptor.service';
import { ReactiveNotificationService } from '../notification/reactive-notification.service';
import { HttpEvent, HttpResponse } from '@angular/common/http';

describe('HttpNotificationInterceptor', () => {
  let interceptor: HttpNotificationInterceptor;
  let mockNotificationsService: Partial<ReactiveNotificationService>;
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));
    mockNotificationsService = {
      notifications: of([]),
      error(message: string) {},
    };
    spyOn(mockNotificationsService, 'error');
    TestBed.configureTestingModule({
      providers: [
        HttpNotificationInterceptor,
        { provide: ReactiveNotificationService, useValue: mockNotificationsService },
      ],
    });
    interceptor = TestBed.get(HttpNotificationInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('does NOT create notification for successful requests', done => {
    scheduler.run(({ cold, expectObservable }) => {
      const httpResponse: HttpResponse<any> = new HttpResponse({ status: 200 });
      const response = cold('--a|', { a: httpResponse });
      const result = interceptor.intercept({} as any, { handle: () => response as any });

      expectObservable(result).toBe('--a|', { a: httpResponse });

      setTimeout(() => {
        expect(mockNotificationsService.error).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });

  it('creates error notification for any http response with status > 201', done => {
    scheduler.run(({ cold, expectObservable }) => {
      const httpResponse: HttpResponse<any> = new HttpResponse({ status: 500 });
      const response = cold('--a|', { a: httpResponse });
      const result = interceptor.intercept({} as any, { handle: () => response as any });

      expectObservable(result).toBe('--a|', { a: httpResponse });

      setTimeout(() => {
        expect(mockNotificationsService.error).toHaveBeenCalledTimes(1);
        expect(mockNotificationsService.error).toHaveBeenCalledWith('Backend request failed');
        done();
      });
    });
  });

  it('creates error notification for failed requests', done => {
    scheduler.run(({ cold, expectObservable }) => {
      const error = new Error('404');
      const response = cold('--#', {}, error);
      const result = interceptor.intercept({} as any, { handle: () => response as any });

      expectObservable(result).toBe('--#', {}, error);

      setTimeout(() => {
        expect(mockNotificationsService.error).toHaveBeenCalledTimes(1);
        expect(mockNotificationsService.error).toHaveBeenCalledWith('Backend request error');
        done();
      });
    });
  });
});
