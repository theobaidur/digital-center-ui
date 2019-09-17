import { Base } from 'src/app/model/_base.interface';

export interface Product extends Base {
    name?: string;
    name_bn?: string;
    description?: string;
    short_description?: string;
    unit_price?: number;
    digital_center_id?: string;
    category_id?: string;
    product_status?: string;
    product_unit?: number;
    regular_unit_price?: number;
    approved?: boolean;
    avg_ratting?: number;
    ratting_count?: number;
    promotion_running?: boolean;
    show_in_gallery?: boolean;
    sale_count?: number;
    product_image?: string;
}
