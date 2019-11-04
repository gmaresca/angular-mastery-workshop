import { TestBed } from '@angular/core/testing';

import { UuidService } from '../uuid/uuid.service';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let mockUuid: number;

  beforeEach(() => {
    mockUuid = 0;

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        {
          provide: UuidService,
          useValue: {
            generate: () => mockUuid++,
          },
        },
      ],
    });
    service = TestBed.get(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO 3: see that the test of imperative notification services uses real time, what does that mean for testing?
  it('should add and remove info notification', done => {
    service.info('info message', 200);

    expect(service.notificationsSync.length).toBe(1);
    expect(service.notificationsSync[0]).toEqual({
      id: 0,
      type: 'info',
      message: 'info message',
    } as any);

    setTimeout(() => {
      expect(service.notificationsSync.length).toBe(0);
      done();
      // TODO 4: notice that by using real time we have to explicitly call "done()" once the test was finished...
    }, 210);
    // TODO 5: and this represents the most simple test possible, what would happen if we couldn't override timeout value?
  });
});
