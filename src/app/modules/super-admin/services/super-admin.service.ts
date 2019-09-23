import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SuperAdminService {
    public adminStat: any;
    refreshStat: BehaviorSubject<boolean> = new BehaviorSubject(false);
    constructor(private httpClient: HttpClient) {
        this.refreshStat.pipe(
            switchMap(() => {
                const url = `${environment.apiRoot}/utility/admin-home-stat`;
                return this.httpClient.get(url);
            })
        ).subscribe(response => this.adminStat = response);
    }
}
