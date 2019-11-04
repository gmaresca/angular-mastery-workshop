import localeDeCh from '@angular/common/locales/de-CH';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpNotificationInterceptor } from './interceptors/http-notification-interceptor.service';
import { NotificationService } from './notification/notification.service';
import { NotificationComponent } from './notification/notification/notification.component';
import { ReactiveNotificationService } from './notification/reactive-notification.service';

registerLocaleData(localeDeCh);

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NotificationComponent],
  imports: [SharedModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-CH' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpNotificationInterceptor, multi: true },
    NotificationService
    // TODO 19: replace "NotificationService" with "{ provide: NotificationService, useClass: ReactiveNotificationService }"
    // TODO 20: find it in the "notification.component.html"
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
