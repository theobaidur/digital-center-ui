import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/admin/models/user.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Role } from 'src/app/modules/admin/models/role.model';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/modules/admin/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { RoleService } from 'src/app/modules/admin/services/role.service';
import { DigitalCenterService } from 'src/app/modules/admin/services/digital-center.service';
import { distinctUntilChanged, switchMap, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  model: User = {};
  roles: Role[] = [];
  digitalCenters: DigitalCenter[] = [];
  nextPage = 1;
  loadMoreCenters: Subject<number> = new Subject();
  constructor(
    private dataService: AuthService,
    private router: Router,
    private aleartService: SweetAlertService,
    private roleService: RoleService,
    private digitalCenterService: DigitalCenterService,
    private route: ActivatedRoute
  ) { }
  selectedRoles: any[] = [];
  passwordChanged = false;
  ngOnInit() {
    this.roleService.all.subscribe(list => this.roles = [...list]);
    this.digitalCenterService.all.subscribe(list => this.digitalCenters = [...list]);
    this.loadMoreCenters.pipe(
      distinctUntilChanged(),
      switchMap(page => this.digitalCenterService.getList(page))
    ).subscribe(response => {
      if (response.meta && response.meta.page && response.meta.page['last-page']) {
        const lastPage = +response.meta.page['last-page'];
        if (this.nextPage + 1 < lastPage) {
          this.nextPage++;
        }
        }
    });
    this.loadCenters();
    this.route.params.pipe(
      filter(params => !!params.id),
      map(params => params.id),
      distinctUntilChanged(),
      tap(() => this.aleartService.loading()),
      switchMap(id => this.dataService.get(id)),
      tap(() => this.aleartService.close()),
    ).subscribe(data => this.model = data);
  }

  loadCenters() {
    this.loadMoreCenters.next(this.nextPage);
  }

  toBlob(dataURI: string) {
    let byteString: string;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = unescape(dataURI.split(',')[1]);
    }

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  }

  get hasRoles() {
    return this.model.roles && this.model.roles.length;
  }

  submit() {
    const model = {...this.model};
    delete model.roles;
    delete model.digital_center_id;
    if (!this.passwordChanged) {
      delete model.password;
    }
    const form = new FormData();
    const data = {
      type: 'users',
      attributes: {...model},
      id: model.id,
      relationships: {
        roles: {
          data: (this.model.roles || []).map(role => ({
            type: 'roles',
            id: role.id
          }))
        },
        digitalCenter: {
          data: {
            type: 'digital-centers',
            id: this.model.digital_center_id
          }
        }
      }
    };
    this.aleartService.saving();
    form.set('data', JSON.stringify({data}));
    this.dataService.update(model.id, form).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/super-admin/user-edit', response.id]);
    }, () => this.aleartService.failed());
  }

}
