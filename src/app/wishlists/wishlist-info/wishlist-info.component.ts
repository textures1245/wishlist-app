import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromGlobal from '../store/global.reducer';
import { Wishlist } from '../wishlist.model';
import { Store } from '@ngrx/store';
import * as WishlistAction from '../store/wishlist.action';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { WishlistService } from '../wishlist.service';
import { ConfirmService } from 'src/app/shared/confirm-window/confirm.service';

@Component({
  selector: 'app-wishlist-info',
  templateUrl: './wishlist-info.component.html',
  styleUrls: ['./wishlist-info.component.css'],
})
export class WishlistInfoComponent implements OnInit, OnDestroy {
  wishlist: Wishlist | any;
  id: number = 0;
  _clearWishlistState$ = Subscription.EMPTY;
  _clearConfirmState$

  constructor(
    private store: Store<fromGlobal.AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private wishlistService: WishlistService,
    private confirmService: ConfirmService
  ) {
    //* confirm delete action
    this._clearConfirmState$ = this.confirmService.confirmAction$.subscribe((confirm) => {
      if (confirm) {
        this.store.dispatch(new WishlistAction.DeleteWishlist());
        this.store.dispatch(new WishlistAction.ClearWishlist());
        this.router.navigate(['/wishlists']);
      }
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.store.dispatch(new WishlistAction.GetWishlist(+params['id']));
    });
    this._clearWishlistState$ = this.store
      .select('wishlistState')
      .subscribe((wishlistState) => {
        this.wishlist = wishlistState.wishlistDetail;
      });
    
    if (!this.wishlist) {
      this.router.navigate(['/wishlists']);
    }
  }

  onCalledDeleteWishlist() {
    this.sharedService.calledConfirmAction$.next('CONFIRM_ACTION');
  }

  onHistoryBack() {
    this.store.dispatch(new WishlistAction.ClearWishlist());
    this.wishlistService._clearItemDialog$.unsubscribe();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onOpenDialog = () => {
    this.sharedService.openDialog$.next(true);
  };

  ngOnDestroy(): void {
    this._clearWishlistState$.unsubscribe();
    this._clearConfirmState$.unsubscribe();
  }
}
