import { Directive, Input, ElementRef } from '@angular/core';
import { TokenResolverService } from '../services/token-resolver.service';

@Directive({
  selector: '[appTranslateToken]'
})
export class TranslateTokenDirective {
    @Input() appTranslateToken: string;
  constructor(
      tokenResolver: TokenResolverService,
      el: ElementRef
  ) {
      tokenResolver.resolve(this.appTranslateToken).subscribe(token => {
          el.nativeElement.innerHtml = token;
      });
  }

}
