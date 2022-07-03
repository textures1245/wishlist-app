import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { ConfirmService } from '../shared/confirm-window/confirm.service';
import { SharedService } from '../shared/shared.service';
import * as fromGlobal from '../wishlists/store/global.reducer';
import * as AuthAction from '../auth/store/auth.actions';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../shared/notification-alert/notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm') authForm: NgForm;
  isLoginPage = false;
  _store$ = Subscription.EMPTY;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromGlobal.AppState>,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.isLoginPage = url[1].path === 'login';
    });

    this._store$ = this.store.select('authState').subscribe((authState) => {
      const authenticatedFailed = authState.authError.message !== null;
      if (authenticatedFailed) {
        //* shows all error obj on dev mode, toggle devMode on handleError method first to see the error obj
        console.log(authState.authError);

        if (authState.authError.status === null) {
          this.notificationService.takeNotificationAction$.next('ERROR_ALERT');
          this.notificationService.takeNotificationMessage$.next([
            'Authentication failed',
            authState.authError.message,
          ]);
          this.store.dispatch(new AuthAction.ClearError());
        }
      }
    });
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    if (this.isLoginPage) {
      this.store.dispatch(new AuthAction.Login({ email, password }));
    } else {
      this.store.dispatch(new AuthAction.Signup({ email, password }));
    }

    this.authForm.reset();
  }

  ngOnDestroy(): void {
    if (this._store$) {
      this._store$.unsubscribe();
    }
  }
}
