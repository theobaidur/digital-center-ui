import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/admin/models/user.model';
import { AuthService } from 'src/app/modules/admin/services/auth.service';
import { Roles } from 'src/app/enums/roles.enum';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  user: User;
  language = 'EN';
  constructor(
    private authService: AuthService,
    private languageService: LanguageService
  ) {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.languageService.language.subscribe(lang => {
      if (lang.toLowerCase() === 'bn') {
        this.language = 'EN';
      } else {
        this.language = 'বাংলা';
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  get superAdmin() {
    return this.authService.hasRole(Roles.SUPER_ADMIN);
  }

  get ecommerceAdmin() {
    return this.authService.hasRole(Roles.ROLE_ECOMMERCE_ADMIN);
  }

  get trainingAdmin() {
    return this.authService.hasRole(Roles.ROLE_TRAINING_ADMIN);
  }

  toggleLang() {
    if (this.languageService.language.getValue().toLowerCase() === 'bn') {
      this.languageService.language.next('EN');
    } else {
      this.languageService.language.next('BN');
    }
  }

}
