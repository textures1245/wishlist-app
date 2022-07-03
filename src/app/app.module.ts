import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { OverviewComponent } from './overview/overview.component';
import { WishlistListComponent } from './wishlists/wishlist-list/wishlist-list.component';
import { WishlistInfoComponent } from './wishlists/wishlist-info/wishlist-info.component';
import { WishlistEditComponent } from './wishlists/wishlist-edit/wishlist-edit.component';
import { AppRoutingModule } from './route/app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './wishlists/store/global.reducer';
import { FooterComponent } from './shared/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmWindowComponent } from './shared/confirm-window/confirm-window.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SubStringPipe } from './sub-string-pipe/sub-string.pipe';
import { AuthComponent } from './auth/auth.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { NotificationAlertComponent } from './shared/notification-alert/notification-alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OverviewComponent,
    WishlistListComponent,
    WishlistInfoComponent,
    WishlistEditComponent,
    FooterComponent,
    ConfirmWindowComponent,
    SubStringPipe,
    AuthComponent,
    NotificationAlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
