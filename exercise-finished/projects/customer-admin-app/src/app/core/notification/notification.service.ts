import { Injectable } from '@angular/core';
import { merge, Observable, of, ReplaySubject } from 'rxjs';
import { delay, mergeMap, scan } from 'rxjs/operators';

import { UuidService } from '../uuid/uuid.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private removeNotificationTrigger = new ReplaySubject<NotificationAction>();
  private addNotificationTrigger = new ReplaySubject<NotificationAction>();

  notifications: Observable<Notification[]>;

  constructor(private uuidService: UuidService) {
    this.notifications = merge(
      this.addNotificationTrigger.asObservable(),
      this.removeNotificationTrigger
        .asObservable()
        .pipe(mergeMap(action => of(action).pipe(delay(action.timeout || 0)))),
    ).pipe(
      scan((notifications: Notification[], action: NotificationAction) => {
        if (action.type === 'add') {
          return [...notifications, action.notification];
        }
        if (action.type === 'remove') {
          return notifications.filter(notification => notification.id !== action.notification.id);
        }
      }, []),
    );
  }

  info(message: string, timeout: number = 2000) {
    this.addNotification('info', message, timeout);
  }

  warning(message: string, timeout: number = 5000) {
    this.addNotification('warning', message, timeout);
  }

  error(message: string) {
    this.addNotification('error', message);
  }

  removeNotification(notification: Notification) {
    this.removeNotificationTrigger.next({ type: 'remove', notification, timeout: 0 });
  }

  private addNotification(type: NotificationType, message: string, timeout?: number) {
    const notification = { id: this.uuidService.generate(), type, message };
    this.addNotificationTrigger.next({ type: 'add', notification });
    if (timeout) {
      this.removeNotificationTrigger.next({ type: 'remove', notification, timeout });
    }
  }
}

export type NotificationType = 'info' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

export interface NotificationAction {
  type: 'add' | 'remove';
  notification: Notification;
  timeout?: number;
}
