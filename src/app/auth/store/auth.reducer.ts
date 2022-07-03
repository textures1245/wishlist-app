import { User } from "../user.mode";
import { UserHandler } from "../userHandler.model";
import * as AuthAction from "./auth.actions";

export interface State {
  user: User;
  username: string;
  authError: UserHandler;
  redirect: boolean;
}

const initialState = {
  user: null,
  username: null,
  authError: null,
  redirect: false
}

const getUsername = (userEmail: string) => {
  if (userEmail) {
    return userEmail.split("@")[0];
  }
  return null;
}

export function authReducer(state = initialState, action: AuthAction.AuthActions) {
  switch (action.type) {
    case AuthAction.LOGIN:
    case AuthAction.SIGNUP:
      return {
        ...state,
        authError: {status: null, message: null, name: null, messageHeader: null},
      }
    case AuthAction.AUTHENTICATION_SUCCESS:
      const payload = action.payload
      const user = new User(payload.email, payload.userId, payload.token, payload.expirationDate)
      return {
        ...state,
        authError: {status: null, message: null, name: null, messageHeader: null},
        username: getUsername(user.email),
        redirect: true,
        user: user
      }
    case AuthAction.AUTHENTICATION_FAILED:
      return {
        ...state,
        user: null,
        username: null,
        redirect: false,
        authError: action.payload,
      }
    case AuthAction.LOGOUT:
      return {
        ...state,
        user: null,
        username: null
      }
    case AuthAction.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      }
    default:
      return state;
  }
}

