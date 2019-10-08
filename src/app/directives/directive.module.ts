import { NgModule } from '@angular/core';
import { BanglaInputDirective } from './bangla-input.directive';
import { TranslateTokenDirective } from './translate-token.directive';

@NgModule({
    declarations: [BanglaInputDirective, TranslateTokenDirective],
    exports: [BanglaInputDirective, TranslateTokenDirective]
})
export class DirectiveModule {}
