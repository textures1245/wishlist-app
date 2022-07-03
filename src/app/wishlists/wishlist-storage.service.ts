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
  username: string|null = null;
  userDatabase: string|null = null;
  wishlists: Wishlist[] = [];

  constructor(
    private http: HttpClient,
    private store: Store<fromGlobal.AppState>
  ) {
    this.store
      .select('authState')
      .subscribe((authState) => {
        this.username = authState.username;
        this.userDatabase = environment.DatabaseAPI + this.username + '.json';
      });
  }

  putWishlist() {
    if (this.username !== null) {
      this.store.select('wishlistState').subscribe((wishlists) => {
        this.wishlists = wishlists.wishlists;
      });
      this.http
        .put<Wishlist[]>(this.userDatabase, this.wishlists)
        .subscribe((resData) => {
          console.log('put success', resData);
        });
    } else {
      alert('username is null');
    }
  }

  fetchWishlist() {
    if (this.username !== null) {
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
    } else {
      alert('username is null');
    }
  }
}
