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

  constructor(private notificationService: ReactiveNotificationService) {}

  ngOnInit() {
    this.notifications = this.notificationService.notifications;
  }

  removeNotification(notification: Notification) {
    this.notificationService.remove(notification);
  }
}
