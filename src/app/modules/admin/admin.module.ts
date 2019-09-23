import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ProfileBaseComponent } from './pages/profile-base/profile-base.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';


@NgModule({
  declarations: [LoginComponent, ProfileBaseComponent, ProfileDetailsComponent, ProfileEditComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  providers: [AuthGuard, RoleGuard]
})
export class AdminModule { }
