import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Notification } from '../notification';
import { ReactiveNotificationService } from '../reactive-notification.service';

@Component({
  selector: 'my-org-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notifications: Observable<Notification[]>;

  // DONE 0: run application and test notification feature to get better idea what are we going to test

  // DONE 1: notice we're injecting a service which means we want to mock it in the test
  // (we want to test component in isolation, service implementation does not matter)
  constructor(private notificationService: ReactiveNotificationService) {}

  ngOnInit() {
    this.notifications = this.notificationService.notifications;
  }

  removeNotification(notification: Notification) {
    this.notificationService.remove(notification);
  }
}
