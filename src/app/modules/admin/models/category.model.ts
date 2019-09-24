import { Base } from 'src/app/model/_base.interface';

export interface Category extends Base {
    name?: string;
    name_bn?: string;
    related_name?: string;
    related_name_bn?: string;
    cns_charge?: number;
    affiliate_charge?: number;
    charge_type?: string;
    approved?: string;
    parent_id?: string;
    category_icon?: string;
    category_thumb?: string;
    category_banner?: string;
}
