import { NgModule } from '@angular/core';
import { TranslatePipe } from './translate.pipe';
import { SwitchLanguagePropPipe } from './switch-language-prop.pipe';
import { AttachmentPipe } from './attachment.pipe';
import { LocalDatePipe } from './local-date.pipe';

@NgModule({
    declarations: [TranslatePipe, SwitchLanguagePropPipe, AttachmentPipe, LocalDatePipe],
    exports: [TranslatePipe, SwitchLanguagePropPipe, AttachmentPipe, LocalDatePipe]
})
export class PipeModule {}
