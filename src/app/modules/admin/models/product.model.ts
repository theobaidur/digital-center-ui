import { Base } from 'src/app/model/_base.interface';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { Category } from './category.model';

export interface Product extends Base {
    name?: string;
    name_bn?: string;
    short_description?: string;
    short_description_bn?: string;
    related_name?: string;
    related_name_bn?: string;
    description?: string;
    description_bn?: string;
    unit_price?: number;
    product_unit?: string;
    digital_center_id?: string;
    digital_center?: DigitalCenter;
    category_id?: string;
    category?: Category;
    product_status?: 'available' | 'out_of_stock';
    approved?: boolean;
    regular_unit_price?: string;
    promotion_running?: boolean;
    show_in_gallery?: string;
    sale_count?: number;
    avg_ratting?: number;
    ratting_count?: number;
    product_images?: string;
    primary_image?: string;
    primary_image_thumb?: string;
}
