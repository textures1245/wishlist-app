import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {}

  takeNotificationAction$ = new Subject<string>();
  takeNotificationMessage$ = new Subject<string[]>();
}
