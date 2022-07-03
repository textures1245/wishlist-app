import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromGlobal from "../wishlists/store/global.reducer";
import * as AuthAction from "../auth/store/auth.actions";
import { exhaustMap, map, Observable, take } from "rxjs";
import { User } from "./user.mode";

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromGlobal.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('authState').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap((user: User) => {
        if (!user) {
          return next.handle(req);
        }

        //* modify request when authenticate is succeed
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        })
        return next.handle(modifiedReq);
      })
    )
  }
}
