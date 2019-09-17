import { Base } from 'src/app/model/_base.interface';

export interface Attachment extends Base {
    description?: string;
    filename?: string;
    filesize?: number;
    filetype?: string;
    group?: string;
    title?: string;
    url?: string;
}
