import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';

import { ConfirmDialogComponent } from '../../../shared/dialog/confirm-dialog/confirm-dialog.component';

import { Customer } from '../model/customers';

@Component({
  selector: 'my-org-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss'],
})
export class CustomerItemComponent implements OnInit {
  @Input() customer: Customer;

  @Output() remove = new Subject<Customer>();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  confirmRemove() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Remove customer',
        message: `Do you really want to remove customer "${this.customer.name} ${this.customer.surname}" from the database?`,
      },
    });

    confirmDialog.afterClosed().subscribe(
      isConfirmed => {
        if (isConfirmed) {
          this.remove.next(this.customer);
        }
      },
      null,
      () => console.log('completed'),
    );
  }
}
