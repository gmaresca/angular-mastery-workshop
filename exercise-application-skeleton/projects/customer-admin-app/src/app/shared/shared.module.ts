import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import{
  MatToolbarModule,
  MatButtonModule
} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    MatToolbarModule,
    MatButtonModule,

    RouterModule
    
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,

    RouterModule
  ]
})
export class SharedModule { }
