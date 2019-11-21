import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/admin/models/user.model';
import { AuthService } from 'src/app/modules/admin/services/auth.service';

@Component({
  selector: 'app-training-admin-page',
  templateUrl: './training-admin-page.component.html',
  styleUrls: ['./training-admin-page.component.scss']
})
export class TrainingAdminPageComponent implements OnInit {
  user: User;
  menuItems = [
    {prefix: 'course', title: 'Course'},
    {prefix: 'student', title: 'Student'},
    {prefix: 'teacher', title: 'Teacher'},
    {prefix: 'batch', title: 'Batch'},
    {prefix: 'attendance', title: 'Attendance'},
    {prefix: 'result', title: 'Result'},
    {prefix: 'routine', title: 'Routine'},
  ];
  constructor(
    private authService: AuthService
  ) {
    this.authService.authState.subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
