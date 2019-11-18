import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // TODO 4: add route that matches empty route '' and redirects it to 'home', explore pathMatch property options
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./features/customers/customers.module').then(m => m.CustomersModule),
  },
  // TODO 5: try navigating to nonexistent route, eg http://localhost:8080/wrong and see what happens

  // TODO 6: implement catch all route '**' that redirects to 'home', what would happen if it wasn't implemented as last?
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
