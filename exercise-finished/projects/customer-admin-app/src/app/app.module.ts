import localeDeCh from '@angular/common/locales/de-CH';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(localeDeCh);

@NgModule({
  declarations: [AppComponent],
  imports: [
    // vendor
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // local
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-CH' } ],
  bootstrap: [AppComponent],
})
export class AppModule {}
