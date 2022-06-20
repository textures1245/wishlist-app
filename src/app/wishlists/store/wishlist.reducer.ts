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
  wishlists: [
    // new Wishlist(
    //   0,
    //   'iPad Pro 12',
    //   'iPad Pro 12 with screen 12.9 inch',
    //   899,
    //   'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=704&q=80',
    //   'soucre'
    // ),
    // new Wishlist(
    //   1,
    //   'JÄRVFJÄLLET',
    //   '10 year guarantee. Read about the terms in the guarantee brochure',
    //   499,
    //   'https://www.ikea.com/th/th/images/products/jaervfjaellet-office-chair-with-armrests__1009906_pe827773_s5.jpg?f=xl',
    //   'https://www.ikea.com/th/en/p/jaervfjaellet-office-chair-with-armrests-80494540/'
    // ),
  ],
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
