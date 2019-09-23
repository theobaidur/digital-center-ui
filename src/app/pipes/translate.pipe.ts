import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(
    private localstorageService: LocalStorageService
  ) {}
  transform(model: any, prop: string): any {
    return null;
  }

}
