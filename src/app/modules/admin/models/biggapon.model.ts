import { Base } from '../../../model/_base.interface';

export interface Biggapon extends Base {
    title?: string;
    title_bn?: string;
    target?: string;
    location?: string;
    biggapon_type?: 'video' | 'image';
}
