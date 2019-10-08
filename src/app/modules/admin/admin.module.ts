import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ProfileBaseComponent } from './pages/profile-base/profile-base.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { FormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ResetUpdateComponent } from './components/reset-update/reset-update.component';
import { SharedComponentModule } from 'src/app/components/shared-component.module';
import { DirectiveModule } from 'src/app/directives/directive.module';


@NgModule({
  declarations: [LoginComponent, ProfileBaseComponent, ProfileDetailsComponent, ResetPasswordComponent, ResetUpdateComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedComponentModule,
    DirectiveModule
  ],
  providers: []
})
export class AdminModule { }
