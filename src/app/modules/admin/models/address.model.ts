import { Base } from 'src/app/model/_base.interface';
import { Division } from './division.model';
import { District } from './district.model';
import { Union } from './union';
import { Upazila } from './upazila';

export interface Address extends Base {
    detailed_address?: string;
    division_id?: string;
    district_id?: string;
    upazila_id?: string;
    union_id?: string;
    division?: Division;
    district?: District;
    upazila?: Upazila;
    union?: Union;
}
