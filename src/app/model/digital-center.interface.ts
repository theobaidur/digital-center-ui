import { Base } from './_base.interface';

export interface DigitalCenter extends Base {
    name?: string;
    name_bn?: string;
    host?: string;
    slug?: string;
    address?: string;
    has_shop?: boolean;
    shop_affiliate_only?: boolean;
    union_id?: string;
    upazila_id?: string;
    district_id?: string;
    division_id?: string;
    store_banner?: string;
    logo?: string;
}
