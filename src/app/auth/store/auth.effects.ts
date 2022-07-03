import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { User } from '../user.mode';
import { UserHandler } from '../userHandler.model';
import * as AuthActions from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from 'src/app/shared/notification-alert/notification.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user: User = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticationSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true,
  });
};

const handlerError = (errorRes: HttpErrorResponse) => {
  //* toggle on manually, shows all error info if it was true otherwise shows only the error.message that had modified
  const onDevMode = false;

  let errorObj: UserHandler = {
    status: null,
    message: null,
    name: null,
    messageHeader: null,
  };
  let errorMessage = null;
  if (onDevMode) {
    if (!errorRes.error || !errorRes.error.error) {
      errorObj = {
        status: errorRes.status,
        message: errorRes.message,
        name: errorRes.name,
      };
      return of(new AuthActions.AuthenticationFailed(errorObj));
    }
    if (errorRes.error.error.message) {
      errorObj = {
        status: errorRes.status,
        message: errorRes.message,
        name: errorRes.name,
        messageHeader: errorRes.error.error.message,
      };
      return of(new AuthActions.AuthenticationFailed(errorObj));
    }
  }

  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct';
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage = 'Too many attempts, try again later';
      break;
    default:
      errorMessage = 'Something went wrong';
      break;
  }
  return of(
    new AuthActions.AuthenticationFailed({
      status: null,
      message: errorMessage,
      name: null,
      messageHeader: null,
    })
  );
  //* then created a new observable to prevent return a error observable.
};

@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN),
      switchMap((authData: AuthActions.Login) => {
        return this.http
          .post<AuthResponseData>(environment.apiSignin, {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          })
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
              this.notificationService.takeNotificationAction$.next(
                'SUCCESS_ALERT'
              );
              this.notificationService.takeNotificationMessage$.next([
                `Welcome Back, ${authData.payload.email.split('@')[0]}!`,
              ]);
            }),
            map((resData) => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((errorRes: HttpErrorResponse) => {
              return handlerError(errorRes);
            })
          );
      })
    )
  );

  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP),
      switchMap((authData: AuthActions.Signup) => {
        return this.http
          .post<AuthResponseData>(environment.apiSignup, {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          })
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              console.log(resData);
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((errorRes: HttpErrorResponse) => {
              return handlerError(errorRes);
            })
          );
      })
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          password: string;
          _token: string;
          _expirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return { type: '[DUMMY] userData not found' };
        }

        const loadedUser = new User(
          userData.email,
          userData.password,
          userData._token,
          new Date(userData._expirationDate)
        );

        if (loadedUser.token) {
          //- exp date calculated code
          let expDurationLeft =
            new Date(userData._expirationDate).getTime() - new Date().getTime();
          this.authService.setLogoutTimer(expDurationLeft);
          //* return authentication success action if token is valid else return dummy action
          return new AuthActions.AuthenticationSuccess({
            email: loadedUser.email,
            userId: loadedUser.password,
            token: loadedUser.token,
            expirationDate: new Date(userData._expirationDate),
            redirect: false,
          });
        }

        return { type: "[DUMMY] userData's token EXP timeout" };
      })
    )
  );

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATION_SUCCESS),
        tap((authActionSuccess: AuthActions.AuthenticationSuccess) => {
          if (authActionSuccess.payload.redirect) {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/authenticate', 'login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}
}
