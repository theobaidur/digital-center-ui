import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EcommerceAdminService {
    public adminStat: any;
    refreshStat: BehaviorSubject<boolean> = new BehaviorSubject(false);
    constructor(private httpClient: HttpClient) {}
    fetchStat(from: string, to: string) {
        const url = `${environment.apiRoot}/utility/ecommerce-stat/${from}/${to}`;
        return this.httpClient.get(url);
    }
}
