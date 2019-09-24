import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { AttachmentService } from '../modules/admin/services/attachment.service';
import { of } from 'rxjs';

@Pipe({
  name: 'attachment'
})
export class AttachmentPipe implements PipeTransform {
  constructor(
    private attachmentService: AttachmentService
  ) {}
  transform(id: string): any {
    if (id && this.attachmentService.exists(id)) {
        return this.attachmentService.fromCache(id).url;
    }
    return null;
  }

}
