import { Base } from 'src/app/model/_base.interface';

export interface Category extends Base {
    id?: string;
    name?: string;
    parent_id?: string;
    slug?: string;
    category_icon?: string;
    category_banner?: string;
    category_thumb?: string;
}
