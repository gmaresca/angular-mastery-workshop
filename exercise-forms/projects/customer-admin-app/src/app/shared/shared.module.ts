import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { CoinFormatPipe } from './coin/coin-format.pipe';
import { CoinDirective } from './coin/coin.directive';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { TagListComponent } from './tag-list/tag-list.component';

@NgModule({
  declarations: [CoinFormatPipe, CoinDirective, ConfirmDialogComponent, TagListComponent],
  imports: [
    // angular
    CommonModule,
    RouterModule,
    // TODO 1: import (and export) "ReactiveFormsModule"

    // material
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    // angular
    CommonModule,
    RouterModule,

    // material
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,

    // local
    CoinFormatPipe,
    CoinDirective,
    TagListComponent,
  ],
  entryComponents: [ConfirmDialogComponent],
})
export class SharedModule {}
