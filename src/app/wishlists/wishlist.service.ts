import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class WishlistService {
    _clearItemDialog$ = Subscription.EMPTY 
    constructor() { }
}