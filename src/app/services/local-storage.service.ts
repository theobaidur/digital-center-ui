import { LocalStorageKeys } from '../modules/admin/enums/local-storage.key';
import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    store(key: LocalStorageKeys, data: any) {
        if (window && window.localStorage) {
            window.localStorage.setItem(`${environment.localStoragePrefix}_${key}`, JSON.stringify(data));
        }
    }

    get(key: LocalStorageKeys) {
        if (window && window.localStorage) {
            const item = window.localStorage.getItem(`${environment.localStoragePrefix}_${key}`);
            return item ? JSON.parse(item) : null;
        }
        return null;
    }
}
