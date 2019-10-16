import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
} from '@angular/material';

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
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    // angular
    CommonModule,
    RouterModule,

    // material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule {}
