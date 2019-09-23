import { Base } from 'src/app/model/_base.interface';
import { Role } from './role.model';

export interface User extends Base {
    name?: string;
    email?: string;
    phone?: string;
    active?: boolean;
    activation_token?: string;
    access_token?: string;
    expires_at?: string;
    token_type?: string;
    digital_center_id?: string;
    roles?: Role[];
}
