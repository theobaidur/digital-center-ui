import { Base } from './_base.interface';

export interface DigitalCenter extends Base {
    name?: string;
    bn_name?: string;
    host?: string;
    slug?: string;
    address?: string;
    union_id?: string;
    upazila_id?: string;
    district_id?: string;
    division_id?: string;
    store_banner?: string;
    logo?: string;
}
