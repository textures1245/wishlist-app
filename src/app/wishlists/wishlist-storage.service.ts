import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as fromGlobal from './store/global.reducer';
import { Wishlist } from './wishlist.model';
import * as WishlistAction from './store/wishlist.action';

@Injectable({
  providedIn: 'root',
})
export class WishlistStorageService {
  constructor(
    private http: HttpClient,
    private store: Store<fromGlobal.AppState>
  ) {}
  username = 'phakh';
  userDatabase = environment.DatabaseAPI + this.username + '.json';
  wishlists: Wishlist[] = [];

  putWishlist() {
    this.store.select('wishlistState').subscribe((wishlists) => {
      this.wishlists = wishlists.wishlists;
    });
    this.http
      .put<Wishlist[]>(this.userDatabase, this.wishlists)
      .subscribe((resData) => {
        console.log('put success', resData);
      });
  }

  fetchWishlist() {
    this.http
      .get<Wishlist[]>(this.userDatabase)
      .pipe(
        tap((wishlists) => {
          this.store.dispatch(new WishlistAction.SetWishlist(wishlists));
        })
      )
      .subscribe((resData) => {
        console.log('fetch success', resData);
      });
  }
}
