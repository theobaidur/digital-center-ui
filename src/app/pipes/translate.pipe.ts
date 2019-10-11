import { Pipe, PipeTransform } from '@angular/core';
import { TokenResolverService } from '../services/token-resolver.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(
    private tokenService: TokenResolverService
  ) {}
  transform(key: any, hasNumber = false): any {
    return this.tokenService.resolve(key, hasNumber);
  }

}
