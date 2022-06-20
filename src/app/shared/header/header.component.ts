import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { SharedService } from '../shared.service';
import * as fromGlobal from '../../wishlists/store/global.reducer';
import { Store } from '@ngrx/store';
import * as WishlistAction from '../../wishlists/store/wishlist.action';
import { WishlistStorageService } from 'src/app/wishlists/wishlist-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Output() toggleDarkMode = new EventEmitter<boolean>();
  darkModeState = false;
  openMenu = false;
  stateHasChanged = false;
  _clearChangedState$ = Subscription.EMPTY;
  constructor(
    private sharedService: SharedService,
    private store: Store<fromGlobal.AppState>,
    private wishlistStorage: WishlistStorageService,
  ) {}

  ngOnInit(): void {
    this._clearChangedState$ = this.store.select('wishlistState').subscribe((state) => {
      this.stateHasChanged = state.changeState;
    })
  }

  onToggleDarkMode() {
    this.darkModeState = !this.darkModeState;
    this.toggleDarkMode.emit(this.darkModeState);
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  openDialog() {
    this.sharedService.openDialog$.next(true);
  }

  onChangedState() {
    this.store.dispatch(new WishlistAction.ClearWishlist());
    this.stateHasChanged = false;
  }

  onSaveState() {
    this.wishlistStorage.putWishlist();
    this.onChangedState();
    this.sharedService.calledConfirmAction$.next('SAVE_ACTION');
  }

  onFetchState() {
    this.wishlistStorage.fetchWishlist();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._clearChangedState$.unsubscribe();
  }
}
