import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { LocalStorageKeys } from '../modules/admin/enums/local-storage.key';

@Injectable()

export class CustomHeaderInterceptor implements HttpInterceptor {
    constructor(
        private localStorageService: LocalStorageService
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.localStorageService.get(LocalStorageKeys.AUTH);
        const headers: any = {};
        if (user) {
            headers.Authorization = `Bearer ${user.access_token}`;
        }
        request = request.clone({
            setHeaders: headers
        });
        return next.handle(request);
    }
}
