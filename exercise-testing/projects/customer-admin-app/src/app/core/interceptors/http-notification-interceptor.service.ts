import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ReactiveNotificationService } from '../notification/reactive-notification.service';

@Injectable()
export class HttpNotificationInterceptor implements HttpInterceptor {
  constructor(private notificationService: ReactiveNotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status > 201) {
              this.notificationService.error('Backend request failed');
            }
          }
        },
        error: error => {
          this.notificationService.error('Backend request error');
        },
      }),
    );
  }
}
