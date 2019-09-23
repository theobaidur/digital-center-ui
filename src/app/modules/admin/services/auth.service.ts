import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { HttpBase } from 'src/app/services/http.service';
import { LoginData } from '../interfaces/login-data.interface';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LocalStorageKeys } from 'src/app/modules/admin/enums/local-storage.key';
import { Router } from '@angular/router';
import { Role } from '../models/role.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    root = 'users';
    authState: BehaviorSubject<User> = new BehaviorSubject(this.localStorageService.get(LocalStorageKeys.AUTH));
    roles: BehaviorSubject<Role[]> = new BehaviorSubject([]);
    constructor(
        public httpBase: HttpBase,
        public localStorageService: LocalStorageService,
        public router: Router
        ) {
        this.authState.subscribe(user => {
            console.log(user);
            this.localStorageService.store(LocalStorageKeys.AUTH, user);
        });
    }
    login(data: LoginData) {
        const loginurl = `${this.root}/login`;
        return this.httpBase.post<HttpResponseItem<User>>(loginurl, data, ['roles']).pipe(
            tap(response => {
                const user: User = response.data.attributes;
                user.id = response.data.id;
                if (response.included && Array.isArray(response.included)) {
                    user.roles = response.included.map((role: HttpResponseItem<Role>) => {
                        const item = role.attributes;
                        item.id = role.id;
                        return item;
                    });
                }
                this.authState.next(user);
            })
        );
    }

    logout() {
        const logoutUrl = `${this.root}/logout`;
        return this.httpBase.post<any>(logoutUrl, null).pipe(
            tap(() => {
                this.authState.next(null);
                this.router.navigate(['/admin/login']);
            })
        );
    }

    redirect_login() {
        const login = this.authState.getValue();
        if (login) {
            this.authState.next(null);
        }
        const redirect = location.pathname + location.search;
        this.router.navigate(['/admin/login'], {
            queryParams: {redirect},
            queryParamsHandling: 'merge'
        });
    }
}
