import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from '../wishlist.model';
import { Store } from '@ngrx/store';
import * as fromGlobal from '../store/global.reducer';
import { EMPTY_OBSERVER } from 'rxjs/internal/Subscriber';

@Component({
  selector: 'app-wishlist-list',
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.css'],
})
export class WishlistListComponent implements OnInit {
  wishlists: Observable<{wishlists: Wishlist[]}>;
  openDialog = false;

  constructor(
    private store: Store<fromGlobal.AppState>
  ) {
    this.wishlists = this.store.select('wishlistState');
  }

  ngOnInit(): void {}

  onOpenDialog = () => {
    this.openDialog = true;
  }

}
