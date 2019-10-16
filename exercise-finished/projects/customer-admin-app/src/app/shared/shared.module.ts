import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    // angular
    CommonModule,
    RouterModule,

    // material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    // angular
    CommonModule,
    RouterModule,

    // material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SharedModule {}
