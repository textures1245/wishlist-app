import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Wishlist } from './wishlist.model';
import * as fromGlobal from './store/global.reducer';
import { Observable } from 'rxjs';
import { WishlistStorageService } from './wishlist-storage.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistResolverService implements Resolve<Wishlist[]> {
  wishlists: Wishlist[] = [];

  constructor(
    private store: Store<fromGlobal.AppState>,
    private wishlistStorage: WishlistStorageService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Wishlist[] | Observable<Wishlist[]> | Promise<Wishlist[]> | any {
    this.store.select('wishlistState').subscribe((state) => {
      this.wishlists = state.wishlists;
    });
    if (this.wishlists.length === 0) {
      return this.wishlistStorage.fetchWishlist();
    }
    return this.wishlists;
  }
}
