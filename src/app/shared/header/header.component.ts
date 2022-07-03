import {
  Component,
  Inject,
  Injectable,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { SharedService } from '../shared.service';
import * as fromGlobal from '../../wishlists/store/global.reducer';
import { Store } from '@ngrx/store';
import * as WishlistAction from '../../wishlists/store/wishlist.action';
import { WishlistStorageService } from 'src/app/wishlists/wishlist-storage.service';
import { Subscription } from 'rxjs';
import * as AuthAction from '../../auth/store/auth.actions';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleDarkMode = new EventEmitter<boolean>();
  darkModeState = false;
  openMenu = false;
  openAuthMenu = false;
  stateHasChanged = false;
  _clearChangedState$ = Subscription.EMPTY;
  hadAuthenticate = false;

  constructor(
    private sharedService: SharedService,
    private store: Store<fromGlobal.AppState>,
    private wishlistStorage: WishlistStorageService,
  ) {}

  ngOnInit(): void {
    this._clearChangedState$ = this.store
      .select('wishlistState')
      .subscribe((state) => {
        this.stateHasChanged = state.changeState;
      });
    this.store.select('authState').subscribe((authState) => {
      this.hadAuthenticate = authState.user !== null;
    });

    this.dynamicCloseMenu();
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

  onLogout() {
    this.store.dispatch(new AuthAction.Logout());
  }

  private dynamicCloseMenu() {
    window.onclick = (event) => {
      if (!event.target.matches('.auth-menu')) {
        this.openAuthMenu = false;
      }
    };
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._clearChangedState$.unsubscribe();
  }
}
