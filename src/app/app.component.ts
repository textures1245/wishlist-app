import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from './shared/shared.service';
import { WishlistEditComponent } from './wishlists/wishlist-edit/wishlist-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  darkMode: boolean = false;
  dialogOpen = false;
  _clearDialog$ = Subscription.EMPTY;
  _clearAction$ = Subscription.EMPTY;
  getAction: string = '';

  constructor(private sharedService: SharedService) {
    this._clearDialog$ = this.sharedService.openDialog$.subscribe((opened) => {
      this.dialogOpen = opened;
    });
    this._clearAction$ = this.sharedService.calledConfirmAction$.subscribe((action) => {
      this.getAction = action;
    })
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
