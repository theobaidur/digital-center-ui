import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Pipe({
  name: 'switchLanguageProp'
})
export class SwitchLanguagePropPipe implements PipeTransform {
  constructor(
    private languageService: LanguageService
  ) {}
  transform(model: any, prop: string): Observable<string> {
    return this.languageService.language.pipe(
      map(lang => {
        if (!model) {
          return '';
        }
        console.log(model, prop);
        if ((lang || '').toLowerCase() === 'bn') {
          return model[`${prop}_bn`] || model[prop];
        }
        return model[prop];
      })
    );
  }

}
