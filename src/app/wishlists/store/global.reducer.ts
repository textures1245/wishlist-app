import { State, WishlistReducer} from './wishlist.reducer';
import { ActionReducerMap } from '@ngrx/store';

export const rootReducer = {};

export interface AppState {
    wishlistState: State;
}
  
export const reducers: ActionReducerMap<AppState, any> = {
    wishlistState: WishlistReducer
};