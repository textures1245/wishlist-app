import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Wishlist } from './wishlist.model';
import * as fromGlobal from './store/global.reducer';
import { Observable, take } from 'rxjs';
import { WishlistStorageService } from './wishlist-storage.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistResolverService implements Resolve<Wishlist[]> {
  wishlists: Wishlist[] = [];
  currentUsername = null;
  lastUsername = null;
  firstLoad = false;

  constructor(
    private store: Store<fromGlobal.AppState>,
    private wishlistStorage: WishlistStorageService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Wishlist[] | Observable<Wishlist[]> | Promise<Wishlist[]> | any {
    this.store.select('authState').subscribe((state) => {
      this.currentUsername = state.username;
    });
    this.store
      .select('wishlistState')
      .pipe(take(1))
      .subscribe((state) => {
        this.wishlists = state.wishlists;
        if (this.wishlists.length === 0 && !this.firstLoad) {
          this.firstLoad = true;
          return this.wishlistStorage.fetchWishlist();
        }
        if (this.lastUsername !== this.currentUsername) {
          this.lastUsername = this.currentUsername;
          return this.wishlistStorage.fetchWishlist();
        }
      });
    return this.wishlists;
  }

}
