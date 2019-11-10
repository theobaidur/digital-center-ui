import { Base } from './_base.interface';

export interface DigitalCenter extends Base {
    name?: string;
    name_bn?: string;
    host?: string;
    slug?: string;
    address?: string;
    has_shop?: boolean;
    shop_affiliate_only?: boolean;
    active?: boolean;
    union_id?: string;
    upazila_id?: string;
    district_id?: string;
    division_id?: string;
    store_banner?: string;
    logo?: string;
    contact_address?: string;
    contact_address_bn?: string;
    email_address?: string;
    phone_number?: string;
    phone_number_bn?: string;
    facebook?: string;
    youtube?: string;
    twitter?: string;
    affiliate_of?: string;
}
