import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { AuthGuard } from '../auth/auth.guard';
import { OverviewComponent } from '../overview/overview.component';
import { WishlistEditComponent } from '../wishlists/wishlist-edit/wishlist-edit.component';
import { WishlistInfoComponent } from '../wishlists/wishlist-info/wishlist-info.component';
import { WishlistListComponent } from '../wishlists/wishlist-list/wishlist-list.component';
import { WishlistResolverService } from '../wishlists/wishlist-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'overviews', pathMatch: 'full' },
  { path: 'overviews', component: OverviewComponent },
  {
    path: 'wishlists',
    component: WishlistListComponent,
    resolve: [WishlistResolverService],
    canActivate: [AuthGuard],
  },
  { path: 'wishlists/:id', component: WishlistInfoComponent, canActivate: [AuthGuard] },
  { path: 'new-wishlist', component: WishlistEditComponent, canActivate: [AuthGuard] },
  { path: 'authenticate/login', component: AuthComponent},
  { path: 'authenticate/signup', component: AuthComponent},
  { path: '**', redirectTo: 'overviews' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
