import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromGlobal from '../wishlists/store/global.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private expDurationTimer: any;

  constructor(
    private store:Store<fromGlobal.AppState>,
  ) {}

  setLogoutTimer(duration: number) {
    this.expDurationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout())
    }, duration)
  }

  clearLogoutTimer() {
    if (this.expDurationTimer) {
      clearTimeout(this.expDurationTimer);
      this.expDurationTimer = null
    }
  }
}
