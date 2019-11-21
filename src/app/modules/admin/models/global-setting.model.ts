import { Base } from 'src/app/model/_base.interface';

export interface GlobalSetting extends Base {
    value?: string;
    value_bn?: string;
    type?: string;
}
