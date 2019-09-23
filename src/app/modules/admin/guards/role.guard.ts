import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService
    ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!(next.data && next.data.roles && next.data.roles.length)) {
        return true;
      }
      const rolesToMatch: string[] = next.data.roles;
      return this.authService.authState.pipe(
        filter(user => !!user),
        map(user => {
          const matched = user.roles.filter(role => rolesToMatch.find(name => role.name === name)).length > 0;
          if (!matched) {
            this.authService.redirect_login();
          }
          return matched;
        })
      );
  }

}
