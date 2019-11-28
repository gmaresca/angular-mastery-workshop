import { OrderService } from './services/order.service';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerItemComponent } from './customer-item/customer-item.component';

@NgModule({
  declarations: [CustomersComponent, CustomerItemComponent],
  imports: [SharedModule, CustomersRoutingModule],
  providers: [OrderService],
})
export class CustomersModule {}
