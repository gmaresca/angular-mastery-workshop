import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Notification } from '../notification';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'my-org-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notifications: Observable<Notification[]>;
  notificationsSync: Notification[];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notifications = this.notificationService.notifications;
    this.notificationsSync = this.notificationService.notificationsSync;
  }

  removeNotification(notification: Notification) {
    this.notificationService.remove(notification);
  }
}
