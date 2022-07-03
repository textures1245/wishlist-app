import { Action } from '@ngrx/store';
import { UserHandler } from '../userHandler.model';

export const LOGIN = '[Auth] Login';
export const SIGNUP = '[Auth] Signup';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTHENTICATION_FAILED = '[Auth] Authentication Failed';
export const AUTHENTICATION_SUCCESS = '[Auth] Authentication Success';
export const CLEAR_ERROR = '[Auth] Clear Error';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: { email: string; password: string }) {}
}

export class Signup implements Action {
  readonly type = SIGNUP;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticationSuccess implements Action {
  readonly type = AUTHENTICATION_SUCCESS;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class AuthenticationFailed implements Action {
  readonly type = AUTHENTICATION_FAILED;

  constructor(public payload: UserHandler) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActions =
  | Login
  | Signup
  | Logout
  | AutoLogin
  | ClearError
  | AuthenticationSuccess
  | AuthenticationFailed;
