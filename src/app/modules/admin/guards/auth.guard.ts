import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(
    private authService: AuthService) {}
  canActivate() {
      return this.authService.authState.pipe(
        distinctUntilChanged(),
        map(user => {
        if (user) {
          return true;
        }
        this.authService.redirect_login();
        return false;
      }));
    }
}
