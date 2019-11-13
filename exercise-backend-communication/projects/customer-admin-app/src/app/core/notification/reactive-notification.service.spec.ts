import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';

import { UuidService } from '../uuid/uuid.service';
import { ReactiveNotificationService } from './reactive-notification.service';

describe('ReactiveNotificationService', () => {
  let testScheduler: TestScheduler;
  let service: ReactiveNotificationService;
  let mockUuid: number;

  beforeEach(() => {
    mockUuid = 0;
    testScheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));

    TestBed.configureTestingModule({
      providers: [
        ReactiveNotificationService,
        {
          provide: UuidService,
          useValue: {
            generate: () => mockUuid++,
          },
        },
      ],
    });
    service = TestBed.get(ReactiveNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and remove info notification', () => {
    testScheduler.run(({ expectObservable }) => {
      service.info('info message');

      expectObservable(service.notifications).toBe('a 1999ms b', {
        a: [{ id: 0, type: 'info', message: 'info message' }],
        b: [],
      });
    });
  });

  it('should add and remove info notification with custom timeout', () => {
    testScheduler.run(({ expectObservable }) => {
      service.info('info message', 1500);

      expectObservable(service.notifications).toBe('a 1499ms b', {
        a: [{ id: 0, type: 'info', message: 'info message' }],
        b: [],
      });
    });
  });

  it('should add and remove warning notification', () => {
    testScheduler.run(({ expectObservable }) => {
      service.warning('warning message');

      expectObservable(service.notifications).toBe('a 4999ms b', {
        a: [{ id: 0, type: 'warning', message: 'warning message' }],
        b: [],
      });
    });
  });

  it('should add and remove warning notification with custom timeout', () => {
    testScheduler.run(({ expectObservable }) => {
      service.warning('warning message', 10000);

      expectObservable(service.notifications).toBe('a 9999ms b', {
        a: [{ id: 0, type: 'warning', message: 'warning message' }],
        b: [],
      });
    });
  });

  it('should add and NOT remove error notification', () => {
    testScheduler.run(({ expectObservable }) => {
      service.error('error message');

      expectObservable(service.notifications).toBe('a ---', {
        a: [{ id: 0, type: 'error', message: 'error message' }],
      });
    });
  });

  it('should remove  notification programmatically', () => {
    testScheduler.run(({ expectObservable }) => {
      service.error('error message');
      service.remove({ id: 0 } as any);

      expectObservable(service.notifications).toBe('(ab) ---', {
        a: [{ id: 0, type: 'error', message: 'error message' }],
        b: [],
      });
    });
  });

  it('should handle addition and cleanup of multiple notifications in parallel', () => {
    testScheduler.run(({ expectObservable }) => {
      service.info('info message');
      service.info('info message', 3000);
      service.warning('warning message');
      service.error('error message');

      expectObservable(service.notifications).toBe('(abcd) 1994ms e 999ms f 1999ms g ---', {
        a: [{ id: 0, type: 'info', message: 'info message' }],
        b: [
          { id: 0, type: 'info', message: 'info message' },
          { id: 1, type: 'info', message: 'info message' },
        ],
        c: [
          { id: 0, type: 'info', message: 'info message' },
          { id: 1, type: 'info', message: 'info message' },
          { id: 2, type: 'warning', message: 'warning message' },
        ],
        d: [
          { id: 0, type: 'info', message: 'info message' },
          { id: 1, type: 'info', message: 'info message' },
          { id: 2, type: 'warning', message: 'warning message' },
          { id: 3, type: 'error', message: 'error message' },
        ],
        e: [
          { id: 1, type: 'info', message: 'info message' },
          { id: 2, type: 'warning', message: 'warning message' },
          { id: 3, type: 'error', message: 'error message' },
        ],
        f: [
          { id: 2, type: 'warning', message: 'warning message' },
          { id: 3, type: 'error', message: 'error message' },
        ],
        g: [{ id: 3, type: 'error', message: 'error message' }],
      });
    });
  });
});
