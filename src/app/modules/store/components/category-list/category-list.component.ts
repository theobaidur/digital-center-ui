import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Category } from '../../models/category.model';
import { BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ComponentInput } from '../../interfaces/component-input.interface';
import { CategoryManagerService } from '../../services/category-manager.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnChanges {
  @Input() store: string;
  @Input() category: string;
  categories: Category[] = [];
  inputObserver: BehaviorSubject<ComponentInput> = new BehaviorSubject(null);

  constructor(private categoryManager: CategoryManagerService) {}

  ngOnInit() {
    this.inputObserver.next({
      category: this.category,
      store: this.store
    });
    this.inputObserver.pipe(
      map(input => input.category),
      switchMap(categoryId => this.categoryManager.categories(categoryId))
    ).subscribe(list => this.categories = list);
  }

  ngOnChanges(changes: SimpleChanges) {
    const change: ComponentInput = {};
    if (changes.category) {
      change.category = changes.category.currentValue;
      this.inputObserver.next(change);
    }
  }

}
