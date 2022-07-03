import { Wishlist } from '../wishlist.model';
import * as WishlistAction from '../store/wishlist.action';

export interface State {
  wishlists: Wishlist[];
  wishlistDetail: Wishlist | any;
  itemId: number;
  editMode: boolean;
  changeState: boolean;
}

const initialState: State = {
  wishlists: [],
  wishlistDetail: null,
  itemId: -1,
  editMode: false,
  changeState: false,
};

export function WishlistReducer(
  state = initialState,
  action: WishlistAction.WishlistActions
) {
  switch (action.type) {
    case WishlistAction.ADD_WISHLIST:
      const genId =
        state.wishlists.length > 0
          ? Math.max(...state.wishlists.map((item) => item.id)) + 1
          : 0;
      return {
        ...state,
        changeState: true,
        wishlists: [...state.wishlists, { id: genId, ...action.payload }],
      };
    case WishlistAction.GET_WISHLIST:
      return {
        ...state,
        editMode: true,
        wishlistDetail: state.wishlists.find(
          (wishlist) => wishlist.id === action.payload
        ),
        itemId: action.payload,
      };
    case WishlistAction.UPDATE_WISHLIST:
      const item = state.wishlists.find(
        (wishlist) => wishlist.id === state.itemId
      );
      const updateItem: Wishlist = { ...item, ...action.payload };
      let updatedWishlists: Wishlist[] = [...state.wishlists];
      updatedWishlists[state.itemId] = updateItem;
      return {
        ...state,
        wishlistDetail: updateItem,
        changeState: true,
        wishlists: updatedWishlists,
      };
    case WishlistAction.SET_WISHLIST:
      let copyWishlist = [...state.wishlists];
      copyWishlist = action.payload;
      return {
        ...state,
        wishlists: copyWishlist,
      };
    case WishlistAction.DELETE_WISHLIST:
      return {
        ...state,
        changeState: true,
        wishlists: state.wishlists.filter(
          (wishlist) => wishlist.id !== state.itemId
        ),
      };
    case WishlistAction.CLEAR_WISHLIST:
      return {
        ...state,
        editMode: false,
        wishlistDetail: null,
        itemId: -1,
      };
    case WishlistAction.CHANGED_STATE:
      return {
        ...state,
        changeState: false,
      }
    default:
      return state;
  }
}
