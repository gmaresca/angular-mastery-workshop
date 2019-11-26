import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SharedModule } from '../../../shared/shared.module';

import { Notification } from '../notification';
import { NotificationComponent } from './notification.component';
import { ReactiveNotificationService } from '../reactive-notification.service';

// TODO 3: create mock notification data, it's an array of "Notification" objects
// please type it and create one info and one error mock notification
const MOCK_NOTIFICATIONS = undefined;

// TODO 2: rename "describe" to "fdescribe" to only run this test suite in watch mode
describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  // TODO 4: declare re-assignable "mockNotificationService" variable with "Partial" type of the real service (you can find it in the component class)


  // TODO 8: implement "getNotifications" helper which will get notifications from DOM
  // using fixture debugElement "queryAll" method where we will pass "By.css" method and a css selector for "mat-card" element
  const getNotifications = () => null;

  // TODO 10: implement "getNotificationByIndex" method which will get notifications as previous method but return n-th item based on the "notificationIndex"
  // (use array access, eg items[index])
  const getNotificationByIndex = notificationIndex => null;

  // TODO 11: implement "getNotificationText" method by calling previously defined "getNotificationByIndex" continuing by using "query" with "By.css" for "p" tag
  const getNotificationText = notificationIndex => null;

  // TODO 13: implement "getNotificationButton" method by calling previously defined "getNotificationByIndex" continuing by using "query" with "By.css" for "button" tag
  const getNotificationButton = notificationIndex => null;

  beforeEach(async(() => {
    // TODO 5: create "mockNotificationService" as a new empty object
    // and add "notification" property with the observable value "of()" MOCK_NOTIFICATIONS
    // also add remove method (try using IDE code completion) and leave it empty

    // TODO 6: use Jasmine "spyOn" method to spy on "mockNotificationService" "remove" method

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [NotificationComponent],
      providers: [
        // TODO 7: provide "mockNotificationService" as a value for the "ReactiveNotificationService" token
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
    // TODO 9: expect the number of rendered notifications (using previously defined "getNotifications()" method) to correspond to the count of mock notifications in the data created above

    // TODO 12: expect second noticiation text to be value as in the data created above

  });

  it('it removes notification when button is clicked', () => {
    // TODO 14: retrieve button of the error notification (which index?) access its "native" element and call "click()" method

    // TODO 15: call "detectChanges()" method of the "fixture"

    // TODO 16: expect that the "remove" method of the "mockNotificationsService" has been called once

    // TODO 17: expect that the "remove" method of the "mockNotificationsService" has been called with the removed notification
  });
});
