import { Injectable } from '@angular/core';
import { Division } from '../models/division.model';
import { BehaviorSubject } from 'rxjs';
import { District } from '../models/district.model';
import { Upazila } from '../models/upazila';
import { Union } from '../models/union';
import { HttpBase } from 'src/app/services/http.service';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    divisions: BehaviorSubject<Division[]> = new BehaviorSubject([]);
    districts: BehaviorSubject<District[]> = new BehaviorSubject([]);
    upazilas: BehaviorSubject<Upazila[]> = new BehaviorSubject([]);
    unions: BehaviorSubject<Union[]> = new BehaviorSubject([]);

    constructor(private httpBase: HttpBase) {
        this.httpBase.get<HttpResponseItem<Division>[]>('divisions').subscribe(response => {
            const items: Division[] = response.data.map(item => {
                return {id: item.id, ...item.attributes};
            });
            this.divisions.next(items);
        });
        this.httpBase.get<HttpResponseItem<District>[]>('districts').subscribe(response => {
            const items: District[] = response.data.map(item => {
                return {id: item.id, ...item.attributes};
            });
            this.districts.next(items);
        });
        this.httpBase.get<HttpResponseItem<Upazila>[]>('upazilas').subscribe(response => {
            const items: Upazila[] = response.data.map(item => {
                return {id: item.id, ...item.attributes};
            });
            this.upazilas.next(items);
        });
        this.httpBase.get<HttpResponseItem<Union>[]>('unions').subscribe(response => {
            const items: Union[] = response.data.map(item => {
                return {id: item.id, ...item.attributes};
            });
            this.unions.next(items);
        });
    }
}
