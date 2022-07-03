import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromGlobal from '../wishlists/store/global.reducer';
import * as WishlistAction from '../wishlists/store/wishlist.action';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  versions = ['1.0.0', '1.1.0'];
  versionSelected = this.versions.slice(-1)[0];

  aboutSection = [
    'A simple app to manage your wishlist items.',
    'You can add, edit, delete and share your wishlist items.',
    'This application used Angular 13 frontend framework.',
    'Maintained state management with NgRx Store.',
    'Used Tailwind CSS framework for styling.',
    'Firebase backend for storing data as JSON.',
    'This application is open source and you can contribute to it. You can view the source code on my GitHub.',
    'Authentication feature is available. Sign in with email and password.',
    'Dynamic alert message service',
    '📌 For some reasons this web application are not fully supported on safari browser right now.',
    '📌 For a best experience please used other browser',
  ];

  details = {
    '1.0.0': [
      'Add wishlist, edit wishlist, delete wishlist',
      'Display wishlists',
      'Toggle dark mode',
      'Save and fetch wishlists',
      'Authenticated user and routes',
      'Shows dynamic error messages with Dynamic alert message service',
      'Auto Login/Logout and expired account feature.',
      'Dynamic components, easier for managing item (add, edit view and delete item)',
      'Responsive design for mobile and desktop',
      'UI designing for better user experience',
    ],
    '1.1.0': [
      'Authenticated user and routes',
      'Shows dynamic error messages with Dynamic alert message service',
      'Auto Login/Logout and expired account feature.',
    ],
  };

  constructor(private store: Store<fromGlobal.AppState>) {

  }

  ngOnInit(): void {
    this.store.dispatch(new WishlistAction.ClearWishlist());
  }

  changedVersion(version: string) {
    this.versionSelected = version;
  }
}
