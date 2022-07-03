import { State, WishlistReducer} from './wishlist.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from 'src/app/auth/store/auth.reducer';

export const rootReducer = {};

export interface AppState {
    wishlistState: State;
    authState: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState, any> = {
    wishlistState: WishlistReducer,
    authState: fromAuth.authReducer
};
