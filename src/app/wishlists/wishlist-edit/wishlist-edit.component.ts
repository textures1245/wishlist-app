import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  PatternValidator,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Wishlist } from '../wishlist.model';
import * as fromGlobal from '../store/global.reducer';
import { SharedService } from 'src/app/shared/shared.service';
import * as WishlistAction from '../store/wishlist.action';
import { Subscription } from 'rxjs';
import { WishlistService } from '../wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist-edit',
  templateUrl: './wishlist-edit.component.html',
  styleUrls: ['./wishlist-edit.component.css'],
})
export class WishlistEditComponent implements OnInit {
  @Input() triggerDialog = false;
  @Output() triggerDialogChange = new EventEmitter<boolean>();
  imagePlaceHolder =
    'https://icons.iconarchive.com/icons/ccard3dev/dynamic-yosemite/1024/Preview-icon.png';

  wishlistForm!: FormGroup;
  itemEditor!: Wishlist;
  itemId: number = -1;
  editMode = false;

  constructor(
    private store: Store<fromGlobal.AppState>,
    private sharedService: SharedService,
    private wishlistService: WishlistService,
    private router: Router
  ) {
    this.sharedService.openDialog$.subscribe((open) => {
      this.wishlistService._clearItemDialog$ = this.store
        .select('wishlistState')
        .subscribe((wishlistState) => {
          if (
            wishlistState.wishlistDetail !== null &&
            wishlistState.editMode === true
          ) {
            this.editMode = true;
            this.imagePlaceHolder = wishlistState.wishlistDetail.imageUrl;
            this.itemEditor = wishlistState.wishlistDetail;
            this.itemId = wishlistState.wishlistDetail.id;
          } else {
            this.editMode = false;
          }
        });
      this.initForm();

      this.wishlistForm.controls['imageUrl'].valueChanges.subscribe(
        (imgPreview) => {
          if (this.wishlistForm.controls['imageUrl'].valid) {
            this.imagePlaceHolder = imgPreview;
          } else {
            this.imagePlaceHolder =
              'https://icons.iconarchive.com/icons/ccard3dev/dynamic-yosemite/1024/Preview-icon.png';
          }
        }
      );
    });
  }

  ngOnInit(): void {}

  onCloseDialog = () => {
    this.triggerDialog = false;
    this.wishlistForm.reset();
    this.triggerDialogChange.emit(this.triggerDialog);
  };

  onSubmit() {
    console.log(this.wishlistForm.value);
    if (this.editMode) {
      this.store.dispatch(new WishlistAction.UpdateWishlist(this.wishlistForm.value));
    } else {
      this.store.dispatch(
        new WishlistAction.AddWishlist(this.wishlistForm.value)
      );
    }
    this.sharedService.calledConfirmAction$.next('SUCCESS_ACTION')
    this.onCloseDialog();
  }

  private initForm() {
    let urlValidation = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    let name = '';
    let price = 0;
    let imageUrl = '';
    let description = '';
    let source = '';

    if (this.editMode) {
      name = this.itemEditor.name;
      price = this.itemEditor.price;
      imageUrl = this.itemEditor.imageUrl;
      description = this.itemEditor.description;
      source = this.itemEditor.source;
    }

    this.wishlistForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      price: new FormControl(price, Validators.required),
      description: new FormControl(description, Validators.required),
      imageUrl: new FormControl(imageUrl, [
        Validators.required,
        Validators.pattern(urlValidation),
      ]),
      source: new FormControl(source, [
        Validators.required,
        Validators.pattern(urlValidation),
      ]),
    });
  }
}
