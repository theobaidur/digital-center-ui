import { Base } from '../../../model/_base.interface';

export interface Advertisement extends Base {
    title?: string;
    title_bn?: string;
    target?: string;
    location?: string;
    advertisement_type?: 'video' | 'image';
}
