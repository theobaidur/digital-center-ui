import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Category } from '../../models/category.model';
import { BehaviorSubject } from 'rxjs';
import { ComponentInput } from '../../interfaces/component-input.interface';
import { CategoryManagerService } from '../../services/category-manager.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category-banner',
  templateUrl: './category-banner.component.html',
  styleUrls: ['./category-banner.component.scss']
})
export class CategoryBannerComponent implements OnInit, OnChanges {
  @Input() store: string;
  @Input() category: string;
  categoryDetails: Category;
  inputObserver: BehaviorSubject<ComponentInput> = new BehaviorSubject(null);

  constructor(private categoryManager: CategoryManagerService) {}

  ngOnInit() {
    this.inputObserver.next({
      category: this.category,
      store: this.store
    });
    this.inputObserver.pipe(
      map(input => input.category),
      switchMap(categoryId => this.categoryManager.resolve(categoryId))
    ).subscribe(category => this.categoryDetails = category);
  }

  ngOnChanges(changes: SimpleChanges) {
    const change: ComponentInput = {};
    if (changes.category) {
      change.category = changes.category.currentValue;
      this.inputObserver.next(change);
    }
  }

}
