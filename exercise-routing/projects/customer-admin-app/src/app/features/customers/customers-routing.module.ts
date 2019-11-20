import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  // TODO 7: add new route for 'details' followed by the path param ':id' which will navigate to CustomerDetailsComponent
  // can be navigated using the "eye" icon on the customer item

  // TODO 12: add "canActivate" property to details route which will use our newly created "AuthGuard"
  // try to navigate to the customer details using the "eye" icon on the customer item
  // try to change implementation of "isAdmin" method of the "AuthService" and navigate again ;)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
