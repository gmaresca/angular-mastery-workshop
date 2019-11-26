import { Component, OnInit } from '@angular/core';

import { ReactiveNotificationService } from '../../core/notification/reactive-notification.service';

@Component({
  selector: 'my-org-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private notificationService: ReactiveNotificationService) {}

  ngOnInit() {}

  info() {
    this.notificationService.info('This is info!');
  }

  warning() {
    this.notificationService.warning('This is warning');
  }

  error() {
    this.notificationService.error('This is error');
  }
}
