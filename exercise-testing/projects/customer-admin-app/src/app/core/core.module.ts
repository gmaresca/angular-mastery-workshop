import localeDeCh from '@angular/common/locales/de-CH';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpNotificationInterceptor } from './interceptors/http-notification-interceptor.service';
import { NotificationComponent } from './notification/notification/notification.component';

registerLocaleData(localeDeCh);

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NotificationComponent],
  imports: [SharedModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-CH' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpNotificationInterceptor, multi: true },
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
