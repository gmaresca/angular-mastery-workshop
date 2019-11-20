import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UuidService } from '../uuid/uuid.service';

import { Notification, NotificationType } from './notification';

@Injectable()
export class NotificationService {
  notifications: Observable<Notification[]>;

  notificationsSync: Notification[] = [];

  constructor(private uuidService: UuidService) {}

  info(message: string, timeout: number = 2000): void {
    this.addNotification('info', message, timeout);
  }

  warning(message: string, timeout: number = 5000): void {
    this.addNotification('warning', message, timeout);
  }

  error(message: string): void {
    this.addNotification('error', message);
  }

  remove(notification: Notification): void {
    const indexToRemove = this.notificationsSync.findIndex(n => n.id === notification.id);
    this.notificationsSync.splice(indexToRemove, 1);
  }

  private addNotification(type: NotificationType, message: string, timeout?: number) {
    const notification = { id: this.uuidService.generate(), type, message };
    this.notificationsSync.push(notification);
    if (timeout) {
      setTimeout(() => {
        this.remove(notification);
      }, timeout);
    }
  }
}
