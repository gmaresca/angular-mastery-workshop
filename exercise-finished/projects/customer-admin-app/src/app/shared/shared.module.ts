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
  MatTooltipModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { CoinFormatPipe } from './coin/coin-format.pipe';
import { CoinDirective } from './coin/coin.directive';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [CoinFormatPipe, CoinDirective, ConfirmDialogComponent],
  imports: [
    // angular
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    // material
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    // angular
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    // material
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,

    // local
    CoinFormatPipe,
    CoinDirective,
  ],
  entryComponents: [ConfirmDialogComponent],
})
export class SharedModule {}
