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
import { AdminBaseService } from './admin-base.service';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { RoleService } from './role.service';
import { DigitalCenterService } from './digital-center.service';
import { Base } from 'src/app/model/_base.interface';
import { Roles } from 'src/app/enums/roles.enum';
import { PasswordReset } from '../models/password-reset.model';
import { PasswordUpdate } from '../models/password-update.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends AdminBaseService<User> {
    includes: string[] = ['roles', 'digitalCenter'];
    resourceEndPoint = 'users';
    authState: BehaviorSubject<User> = new BehaviorSubject(this.localStorageService.get(LocalStorageKeys.AUTH));
    normalize(item: HttpResponseItem<User>): User {
        item.attributes.id = item.id;
        item.attributes._type = item.type;
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].roles
            // tslint:disable-next-line: no-string-literal
            && Array.isArray(item['relationships'].roles.data)) {
            // tslint:disable-next-line: no-string-literal
            item.attributes.roles =  item['relationships'].roles.data.map((role: any) => {
                return this.roleService.fromCache(role.id);
            });
        }
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].digitalCenter && item['relationships'].digitalCenter.data) {
            // tslint:disable-next-line: no-string-literal
            const center = item['relationships'].digitalCenter.data;
            item.attributes.digital_center = this.digitalCenterService.fromCache(center.id);
        }
        this.cache(item.attributes, false);
        return item.attributes;
    }
    saveIncludes(response: HttpResponse<any>): void {
        if (response && Array.isArray(response.included)) {
            response.included.forEach(include => {
                console.log(include);
                const data: Base = include.attributes;
                data.id = include.id;
                data._type = include.type;
                if (include.type === 'roles') {
                    this.roleService.cache(data, false);
                }
                if (include.type === 'digital-centers') {
                    this.digitalCenterService.cache(data, false);
                }
            });
        }
        this.roleService.notify();
        this.digitalCenterService.notify();
    }
    get user() {
        return this.authState.getValue();
    }
    hasRole(...roles: Roles[]) {
        const userRoles = this.authState.getValue() ? this.authState.getValue().roles : [];
        return userRoles.find(role => roles.indexOf(role.name) > -1);
    }
    isAdminOf(digitalCenterId: string = null) {

        if (this.user && this.user.digital_center_id === digitalCenterId) {
            return true;
        }
        return false;
    }
    constructor(
        public httpBase: HttpBase,
        public localStorageService: LocalStorageService,
        public router: Router,
        public roleService: RoleService,
        public digitalCenterService: DigitalCenterService
        ) {
            super();
            this.authState.subscribe(user => {
                this.localStorageService.store(LocalStorageKeys.AUTH, user);
            });
    }
    login(data: LoginData) {
        const loginurl = `${this.resourceEndPoint}/login`;
        return this.post(data, loginurl).pipe(
            tap(user => this.authState.next(user))
        );
    }

    initPasswordReset(data: PasswordReset) {
        const url = `${this.resourceEndPoint}/init-password-reset`;
        return this.http.post(url, data);
    }

    resetPassword(data: PasswordReset) {
        const url = `${this.resourceEndPoint}/reset-password`;
        return this.post(data, url).pipe(
            tap(user => this.authState.next(user))
        );
    }

    updatePassword(data: PasswordUpdate) {
        const url = `${this.resourceEndPoint}/update-password`;
        return this.post(data, url).pipe(
            tap(user => this.authState.next(user))
        );
    }

    logout() {
        this.authState.next(null);
        this.router.navigate(['/shop']);
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
