import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StoreUiService {
    collapseSideNav: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
