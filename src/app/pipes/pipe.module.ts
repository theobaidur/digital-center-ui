import { NgModule } from '@angular/core';
import { TranslatePipe } from './translate.pipe';
import { SwitchLanguagePropPipe } from './switch-language-prop.pipe';
import { AttachmentPipe } from './attachment.pipe';

@NgModule({
    declarations: [TranslatePipe, SwitchLanguagePropPipe, AttachmentPipe],
    exports: [TranslatePipe, SwitchLanguagePropPipe, AttachmentPipe]
})
export class PipeModule {}
