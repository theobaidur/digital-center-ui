import { Injectable } from '@angular/core';
import { Division } from '../models/division.model';
import { BehaviorSubject } from 'rxjs';
import { District } from '../models/district.model';
import { Upazila } from '../models/upazila';
import { Union } from '../models/union';
import { HttpBase } from 'src/app/services/http.service';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { DivisionService } from './division.service';
import { DistrictService } from './district.service';
import { UpazilaService } from './upazila.service';
import { UnionService } from './union.service';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    divisions: BehaviorSubject<Division[]> = new BehaviorSubject([]);
    districts: BehaviorSubject<District[]> = new BehaviorSubject([]);
    upazilas: BehaviorSubject<Upazila[]> = new BehaviorSubject([]);
    unions: BehaviorSubject<Union[]> = new BehaviorSubject([]);

    constructor(
        private divisionService: DivisionService,
        private districtService: DistrictService,
        private upazilaService: UpazilaService,
        private unionService: UnionService
        ) {
            this.divisionService.all.subscribe(list => this.divisions.next(list));
            this.districtService.all.subscribe(list => this.districts.next(list));
            this.upazilaService.all.subscribe(list => this.upazilas.next(list));
            this.unionService.all.subscribe(list => this.unions.next(list));
        }
}
