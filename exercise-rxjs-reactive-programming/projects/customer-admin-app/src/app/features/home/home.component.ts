import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../core/notification/notification.service';

@Component({
  selector: 'my-org-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {}

  info() {
    let cazzo:number;
    cazzo =1;
    this.notificationService.info('This is info!');
  }

  warning() {
    this.notificationService.warning('This is warning');
  }

  error() {
    this.notificationService.error('This is error');
  }
}
