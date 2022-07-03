import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ConfirmService {
    confirmAction$ = new Subject<boolean>();
    objectAction$ = new Subject<object>();
    constructor() { }
}
