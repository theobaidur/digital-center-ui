import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Roles } from 'src/app/enums/roles.enum';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  user: User;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState
    .pipe(
      filter(user => !!user),
      switchMap(user => this.authService.get(user.id))
    )
    .subscribe(user => this.user = user);
  }

  get superAdmin() {
    return this.authService.hasRole(Roles.SUPER_ADMIN);
  }

}
