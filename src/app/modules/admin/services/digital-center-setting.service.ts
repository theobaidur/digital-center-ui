import { AdminBaseService } from './admin-base.service';
import { Injectable } from '@angular/core';
import { HttpResponseItem } from '../../../interfaces/http-response-item.interface';
import { HttpResponse } from '../../../interfaces/http-response.interface';
import { DigitalCenterSetting } from '../models/digital-center-setting.model';
@Injectable({
    providedIn: 'root'
})

export class DigitalCenterSettingService extends AdminBaseService<DigitalCenterSetting> {
    includes: string[] = [];
    resourceEndPoint = 'digital-center-settings';
    pageSize = -1;
    normalize(item: HttpResponseItem<DigitalCenterSetting>): DigitalCenterSetting {
        const data = item.attributes;
        data._type = item.type;
        data.id = item.id;
        this.cache(data, false);
        return data;
    }
    saveIncludes(response: HttpResponse<any>): void {}
    constructor() {
        super();
        this.getList().subscribe();
    }
}
