import localeDeCh from '@angular/common/locales/de-CH';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

registerLocaleData(localeDeCh);

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [SharedModule],
  providers: [{ provide: LOCALE_ID, useValue: 'de-CH' }],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
