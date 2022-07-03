import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NotificationService } from './notification.service';
import { toggleAlertAnimation } from '../toggle-animation';

@Component({
  selector: 'app-notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrls: ['./notification-alert.component.css'],
  animations: [toggleAlertAnimation],
})
export class NotificationAlertComponent implements OnInit {
  notificationAlert: string = '';
  message: string[] = [];
  constructor(private notificationService: NotificationService) {
    this.notificationService.takeNotificationAction$.subscribe((action) => {
      this.notificationAlert = action;
      setTimeout(() => {
        this.onCloseWindow();
      }, 4000);
    });
    this.notificationService.takeNotificationMessage$.subscribe(
      (message) => (this.message = message)
    );
  }

  onCloseWindow() {
    this.notificationAlert = '';
    this.message = [];
  }

  ngOnInit(): void {}
}
