import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { NotificationService, Notification } from '../notification.service';

@Component({
  selector: 'my-org-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notifications: Observable<Notification[]>;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notifications = this.notificationService.notifications;
  }

  removeNotification(notification: Notification) {
    this.notificationService.removeNotification(notification);
  }
}
