import { Base } from 'src/app/model/_base.interface';
import { Role } from './role.model';
import { DigitalCenter } from 'src/app/model/digital-center.interface';

export interface User extends Base {
    name?: string;
    email?: string;
    phone?: string;
    active?: boolean;
    activation_token?: string;
    access_token?: string;
    expires_at?: string;
    token_type?: string;
    password?: string;
    digital_center_id?: string;
    digital_center?: DigitalCenter;
    roles?: Role[];
}
