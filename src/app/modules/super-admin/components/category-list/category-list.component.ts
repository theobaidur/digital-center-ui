import { Component, OnInit } from '@angular/core';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';
import { Category } from 'src/app/modules/admin/models/category.model';
import { CategoryService } from 'src/app/modules/admin/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent extends AdminListPage<Category> implements OnInit {
  createPageLink(): string {
    return `/super-admin/category-add`;
  }
  detailPageLink(id: string): string {
    return `/super-admin/category-edit/${id}`;
  }

  constructor(
    service: CategoryService
  ) {
    super(service);
  }

  ngOnInit() {
  }

}
