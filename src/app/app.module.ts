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
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmWindowComponent } from './shared/confirm-window/confirm-window.component';
import { HttpClientModule } from '@angular/common/http';
import { SubStringPipe } from './sub-string-pipe/sub-string.pipe';

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
    SubStringPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
