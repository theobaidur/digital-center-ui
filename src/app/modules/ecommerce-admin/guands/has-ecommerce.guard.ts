import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService } from '../../admin/services/auth.service';
import { Roles } from 'src/app/enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class HasEcommerce implements CanActivate {
  constructor(
    private authService: AuthService
    ) {}
  canActivate(): Observable<boolean> {
      return this.authService.authState.pipe(
        filter(user => !!user),
        map(user => {
          if (this.authService.hasRole(Roles.SUPER_ADMIN)) {
              return true;
          }
          if (this.authService.hasRole(Roles.ROLE_ECOMMERCE_ADMIN) && user.digital_center) {
              return !!user.digital_center.has_shop;
          }
          this.authService.redirect_login();
          return false;
        })
      );
  }

}
