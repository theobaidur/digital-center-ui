import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'localDate'
})
export class LocalDatePipe implements PipeTransform {

  transform(date: string): any {
    return moment(date).format('MM/DD/YYYY h:mm:ss a');
  }

}
