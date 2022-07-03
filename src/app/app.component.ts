import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SharedService } from './shared/shared.service';
import { WishlistEditComponent } from './wishlists/wishlist-edit/wishlist-edit.component';
import * as fromGlobal from './wishlists/store/global.reducer';
import * as AuthAction from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: []
})
export class AppComponent implements OnDestroy {
  darkMode: boolean = false;
  dialogOpen = false;
  _clearDialog$ = Subscription.EMPTY;
  _clearAction$ = Subscription.EMPTY;
  getAction: string = '';

  //* animation states

  constructor(
    private sharedService: SharedService,
    private store: Store<fromGlobal.AppState>
  ) {
    this._clearDialog$ = this.sharedService.openDialog$.subscribe((opened) => {
      this.dialogOpen = opened;
    });
    this._clearAction$ = this.sharedService.calledConfirmAction$.subscribe(
      (action) => {
        this.getAction = action;
      }
    );

    this.store.dispatch(new AuthAction.AutoLogin());
  }

  title = 'wishlist-app';

  switchToDarkMode(toggleState: boolean) {
    this.darkMode = toggleState;
  }

  ngOnDestroy(): void {
    this._clearDialog$.unsubscribe();
    this._clearAction$.unsubscribe();
  }
}
