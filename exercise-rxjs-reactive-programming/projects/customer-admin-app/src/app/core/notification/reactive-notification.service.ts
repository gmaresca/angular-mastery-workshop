import { Injectable } from '@angular/core';
import { merge, Observable, of, ReplaySubject } from 'rxjs';
import { delay, mergeMap, scan } from 'rxjs/operators';

import { UuidService } from '../uuid/uuid.service';

import { NotificationType, Notification, NotificationAction } from './notification';

// TODO 6: we're going to implement reactive notification service using RxJs for comparison!
@Injectable()
export class ReactiveNotificationService {
  // TODO 7: in reactive programming process is usually triggered by some events
  // TODO 8: create "private" instance property with the name "addNotificationTrigger" which should be initialized with the value of "new ReplaySubject<NotificationAction>()"
  // TODO 9: create "private" instance property with the name "removeNotificationTrigger" which should be initialized with the value of "new ReplaySubject<NotificationAction>()"

  notifications: Observable<Notification[]>;

  constructor(private uuidService: UuidService) {
    // TODO 14: Define const "addStream" with value of "this.addNotificationTrigger.asObservable()"

    // TODO 15: Define const "removeStream" with value of "this.removeNotificationTrigger.asObservable().pipe(mergeMap(action => of(action).pipe(delay(action.timeout || 0))))"
    // this will basically delay that trigger by the value of timeout if timeout was provided

    // TODO 16: Initialize value of "this.notifications" with a following stream
    // 1. use "merge" creator operator (from "rxjs" package) and pass in "addStream" and the "removeStream"
    // 2. use ".pipe()" on merge and pass in "scan" operator (from "rxjs/operators" package)
    // 3. pass following callback into the "scan" operator ... "(notifications: Notification[], action: NotificationAction) => { }, []"
    // 4. inside the function body of the callback (between { }) we have to implement logic
    //    which will add or remove received "notification" from the received "notifications" array in the immutable manner (hint use .filter() and [...original, new] )
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

  remove(notification: Notification) {
    // TODO 10: fire next "removeNotificationTrigger" by calling its "next()" method
    // and pass in object with "type: 'remove'", "notification" (from this function argument) and "timeout" 0
  }

  private addNotification(type: NotificationType, message: string, timeout?: number) {
    // TODO 11: create new notification object and store it in the "notification" const with following object properties...
    // "id" use "this.uuidService" to generate new id
    // "type" use type passed in this function as an argument
    // "message" use message passed in this function as an argument

    // TODO 12: fire next "addNotificationTrigger" by calling its "next()" method
    // and pass in object with "type: 'add'", "notification" object which we created just above

    // TODO 13: in case function received "timeout", which is an optional argument of this function
    // fire next "removeNotificationTrigger" by calling its "next()" method
    // and pass in object with "type: 'remove'", "notification" (from this function argument) and the received "timeout"
  }
}
