import { Action } from '@ngrx/store';
import { Wishlist } from '../wishlist.model';

export const ADD_WISHLIST = '[Wishlist] ADD_WISHLIST';
export const GET_WISHLIST = '[Wishlist] GET_WISHLIST';
export const CLEAR_WISHLIST = '[Wishlist] CLEAR_WISHLIST';
export const UPDATE_WISHLIST = '[Wishlist] UPDATE_WISHLIST';
export const DELETE_WISHLIST = '[Wishlist] DELETE_WISHLIST';
export const SET_WISHLIST = '[Wishlist] SET_WISHLIST';
export const CHANGED_STATE = '[Wishlist] CHANGED_STATE';

export class AddWishlist implements Action {
  readonly type = ADD_WISHLIST;
  constructor(public payload: Wishlist) {}
}

export class UpdateWishlist implements Action {
  readonly type = UPDATE_WISHLIST;
  constructor(public payload: Wishlist) {}
}

export class GetWishlist implements Action {
  readonly type = GET_WISHLIST;
  constructor(public payload: number) {}
}

export class DeleteWishlist implements Action {
  readonly type = DELETE_WISHLIST;
}

export class ClearWishlist implements Action {
  readonly type = CLEAR_WISHLIST;
}

export class SetWishlist implements Action {
  readonly type = SET_WISHLIST;

  constructor(public payload: Wishlist[]) {}
}

export class ChangedState implements Action {
  readonly type = CHANGED_STATE;
}

export type WishlistActions =
  | AddWishlist
  | GetWishlist
  | ClearWishlist
  | UpdateWishlist
  | DeleteWishlist
  | SetWishlist
  | ChangedState;
