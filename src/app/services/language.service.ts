import { LocalStorageService } from './local-storage.service';
import { LocalStorageKeys } from '../modules/admin/enums/local-storage.key';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    language: BehaviorSubject<string> = new BehaviorSubject(this.localStorageService.get(LocalStorageKeys.LANG) || 'BN');
    constructor(
        private localStorageService: LocalStorageService
    ) {
        this.language.subscribe(lang => {
            this.localStorageService.store(LocalStorageKeys.LANG, lang || 'BN');
        });
    }
}
