import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerItemComponent } from './customer-item/customer-item.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersBackendService } from './services/customers-backend.service';

@NgModule({
  declarations: [CustomersComponent, CustomerItemComponent, CustomersListComponent],
  imports: [SharedModule, CustomersRoutingModule],
  providers: [CustomersBackendService],
})
export class CustomersModule {}
