import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RequestParam } from '../interfaces/request-param.interface';
import { HttpResponse } from '../interfaces/http-response.interface';

@Injectable({
    providedIn: 'root'
})
export class HttpBase {
    constructor(
        public httpService: HttpClient
    ) {}
    toPath(endpoint: string, includes: string[] = [], filters: RequestParam[]= []) {
        const parts: string[] = [];
        const queryStrings: string[] = [];
        if (includes.length) {
            queryStrings.push('include=' + includes.join(','));
        }
        if (filters.length) {
            filters.forEach(({property, value}) => {
                queryStrings.push(`${property}=${value}`);
            });
        }
        parts.push(environment.apiRoot);
        if (endpoint) {
            parts.push(endpoint);
        }
        const url = parts.join('/');
        const queryString = queryStrings.join('&');
        return `${url}?${queryString}`;
    }
    get<T>(endpoint: string, includes: string[] = [], filter: RequestParam[]= []): Observable<HttpResponse<T>> {
        const path = this.toPath(endpoint, includes, filter);
        return this.httpService.get<HttpResponse<T>>(path);
    }
    post<T>(endpoint: string, data: any, includes: string[] = [], filter: RequestParam[]= []): Observable<HttpResponse<T>> {
        const path = this.toPath(endpoint, includes, filter);
        return this.httpService.post<HttpResponse<T>>(path, data);
    }
    put<T>(endpoint: string, data: any, includes: string[] = [], filter: RequestParam[]= []): Observable<HttpResponse<T>> {
        const path = this.toPath(endpoint, includes, filter);
        return this.httpService.put<HttpResponse<T>>(path, data);
    }
    delete<T>(endpoint: string): Observable<T> {
        const path = this.toPath(endpoint);
        return this.httpService.delete<T>(path);
    }
}
