import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerItemComponent } from './customer-item/customer-item.component';
import { CustomersBackendService } from './services/customers-backend.service';
import { CustomerEditorComponent } from './customer-editor/customer-editor.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerItemComponent,
    CustomerEditorComponent,
    CustomerDetailsComponent,
  ],
  imports: [SharedModule, CustomersRoutingModule],
  providers: [CustomersBackendService],
})
export class CustomersModule {}
