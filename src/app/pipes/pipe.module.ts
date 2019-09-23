import { NgModule } from '@angular/core';
import { TranslatePipe } from './translate.pipe';
import { SwitchLanguagePropPipe } from './switch-language-prop.pipe';

@NgModule({
    declarations: [TranslatePipe, SwitchLanguagePropPipe],
    exports: [TranslatePipe, SwitchLanguagePropPipe]
})
export class PipeModule {}
