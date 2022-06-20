import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    openDialog$ = new Subject<boolean>();
    calledConfirmAction$ = new Subject<string>();
    
    constructor() { }

    startEditItem() {

    }
}