import { Component, OnInit } from '@angular/core';
import { PasswordUpdate } from '../../models/password-update.model';
import { AuthService } from '../../services/auth.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-reset-update',
  templateUrl: './reset-update.component.html',
  styleUrls: ['./reset-update.component.scss']
})
export class ResetUpdateComponent implements OnInit {
  model: PasswordUpdate = {};
  constructor(
    private authService: AuthService,
    private alertService: SweetAlertService
  ) { }

  ngOnInit() {
  }

  submit() {
    this.alertService.saving('Saving...');
    this.authService.updatePassword(this.model).subscribe(() => {
      this.alertService.done('Saved');
    }, (e) => {
      this.alertService.failed();
    });
  }

}
