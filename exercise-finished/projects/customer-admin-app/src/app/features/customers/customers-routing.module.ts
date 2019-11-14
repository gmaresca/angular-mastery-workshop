import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CustomerEditorComponent } from './customer-editor/customer-editor.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'details/:id', component: CustomerDetailsComponent },
  { path: 'editor/:id', component: CustomerEditorComponent },
  { path: 'new', component: CustomerEditorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
