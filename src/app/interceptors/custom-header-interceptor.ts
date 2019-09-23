import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/admin/services/auth.service';

@Injectable()

export class CustomHeaderInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.authService.authState.getValue();
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
