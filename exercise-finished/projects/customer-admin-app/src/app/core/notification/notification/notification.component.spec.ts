import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SharedModule } from '../../../shared/shared.module';

import { Notification } from '../notification';
import { NotificationComponent } from './notification.component';
import { ReactiveNotificationService } from '../reactive-notification.service';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'abc',
    type: 'info',
    message: 'info message',
  },
  {
    id: 'def',
    type: 'error',
    message: 'error message',
  },
];

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let mockNotificationsService: Partial<ReactiveNotificationService>;

  const getNotifications = () => fixture.debugElement.queryAll(By.css('mat-card'));
  const getNotificationByIndex = notificationIndex =>
    fixture.debugElement.queryAll(By.css('mat-card'))[notificationIndex];
  const getNotificationIcon = notificationIndex =>
    getNotificationByIndex(notificationIndex)
      .query(By.css('mat-icon'))
      .nativeElement.textContent.trim();
  const getNotificationText = notificationIndex =>
    getNotificationByIndex(notificationIndex)
      .query(By.css('p'))
      .nativeElement.textContent.trim();
  const getNotificationButton = notificationIndex =>
    getNotificationByIndex(notificationIndex).query(By.css('button'));

  beforeEach(async(() => {
    mockNotificationsService = {
      notifications: of(MOCK_NOTIFICATIONS),
      remove(notification: Notification) {},
    };
    spyOn(mockNotificationsService, 'remove');

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [NotificationComponent],
      providers: [
        {
          provide: ReactiveNotificationService,
          useValue: mockNotificationsService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render notifications', () => {
    expect(getNotifications().length).toBe(2);
    expect(getNotificationIcon(0)).toBe('info');
    expect(getNotificationText(0)).toBe('info message');
    expect(getNotificationButton(0)).toBeFalsy();
    expect(getNotificationIcon(1)).toBe('error');
    expect(getNotificationText(1)).toBe('error message');
    expect(getNotificationButton(1)).toBeTruthy();
  });

  it('it removes notification when button is clicked', () => {
    getNotificationButton(1).nativeElement.click();

    expect(mockNotificationsService.remove).toHaveBeenCalledTimes(1);
    expect(mockNotificationsService.remove).toHaveBeenCalledWith({
      id: 'def',
      type: 'error',
      message: 'error message',
    });
  });
});
