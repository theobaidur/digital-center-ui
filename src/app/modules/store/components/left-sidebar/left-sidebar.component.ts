import { Component, OnInit, Input } from '@angular/core';
import { CategoryManagerService } from '../../services/category-manager.service';
import { Category } from '../../models/category.model';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {
  @Input() store;
  parents: Category[] = [];
  children: Category[] = [];
  grandChildren: Category[] = [];
  selectedCategory: Subject<string> = new Subject();
  selectedSubCategory: Subject<string> = new Subject();
  constructor(
    private categoryManager: CategoryManagerService
  ) { }

  ngOnInit() {
    this.categoryManager.categories(null).subscribe(categories => {
      this.parents = categories;
    });
    this.selectedCategory.pipe(
      switchMap(id => this.categoryManager.categories(id))
    ).subscribe(categories => this.children = categories);
    this.selectedSubCategory.pipe(
      switchMap(id => this.categoryManager.categories(id))
    ).subscribe(categories => this.grandChildren = categories);
  }

  get_category_url(category: Category) {
    return  `/shop/${category.slug}`;
  }

  get params() {
    return {
      store: this.store
    };
  }
}
