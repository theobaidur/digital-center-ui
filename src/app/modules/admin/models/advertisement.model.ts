import { Base } from 'src/app/model/_base.interface';

export interface Advertisement extends Base {
    title?: string;
    title_bn?: string;
    target?: string;
    type?: 'video' | 'image';
}
