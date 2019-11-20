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
