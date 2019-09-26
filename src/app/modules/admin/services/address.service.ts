import { AdminBaseService } from './admin-base.service';
import { Address } from '../models/address.model';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { DivisionService } from './division.service';
import { DistrictService } from './district.service';
import { UpazilaService } from './upazila.service';
import { UnionService } from './union.service';
import { Base } from 'src/app/model/_base.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AddressService extends AdminBaseService<Address> {
    includes: string[] = ['division', 'district', 'upazila', 'union'];
    resourceEndPoint = 'addresses';
    normalize(item: HttpResponseItem<Address>): Address {
        item.attributes.id = item.id;
        item.attributes._type = item.type;

        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].division
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].division.data) {
                // tslint:disable-next-line: no-string-literal
                const data = item['relationships'].division.data;
                item.attributes.division = this.divisionService.fromCache(data.id);
        }

        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].district
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].district.data) {
                // tslint:disable-next-line: no-string-literal
                const data = item['relationships'].district.data;
                item.attributes.district = this.districtService.fromCache(data.id);
        }
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].upazila
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].upazila.data) {
                // tslint:disable-next-line: no-string-literal
                const data = item['relationships'].upazila.data;
                item.attributes.upazila = this.upazilaService.fromCache(data.id);
        }
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].union
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].union.data) {
                // tslint:disable-next-line: no-string-literal
                const data = item['relationships'].union.data;
                item.attributes.union = this.unionService.fromCache(data.id);
        }
        this.cache(item.attributes, false);
        return item.attributes;
    }
    saveIncludes(response: HttpResponse<any>): void {
        if (response && Array.isArray(response.included)) {
            response.included.forEach(include => {
                const data: Base = include.attributes;
                data.id = include.id;
                data._type = include.type;
                switch (include.type) {
                    case 'divisions':
                        this.divisionService.cache(data, false);
                        break;
                    case 'districts':
                        this.districtService.cache(data, false);
                        break;
                    case 'upazilas':
                        this.upazilaService.cache(data, false);
                        break;
                    case 'unions':
                        this.unionService.cache(data, false);
                        break;
                    default:
                        break;
                }
            });
        }
        this.divisionService.notify();
        this.districtService.notify();
        this.upazilaService.notify();
        this.unionService.notify();
    }

    constructor(
        private divisionService: DivisionService,
        private districtService: DistrictService,
        private upazilaService: UpazilaService,
        private unionService: UnionService
    ) {
        super();
    }
}
