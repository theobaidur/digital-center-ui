import { HttpBase } from './http.service';
import { HttpResponseItem } from '../interfaces/http-response-item.interface';
import { Injectable } from '@angular/core';

interface Config{
    value?: string,
    value_bn?: string
}

@Injectable({
    providedIn: 'root'
})
export class GlobalSettingManager{
    settings:{[key: string]: Config} = {}
    constructor(
        private http: HttpBase
    ){
        this.http.get<HttpResponseItem<{[key: string]: any}>[]>('global-settings').subscribe(response=>{
            if(response && response.data){
                response.data.forEach(item=>{
                    this.settings[item.attributes.key] = {
                        value: item.attributes.value,
                        value_bn: item.attributes.value_bn
                    }
                });
            }
        });
    }

    getConfig(key: string){
        if(this.settings[key]){
            return this.settings[key];
        }
        return null;
    }
}