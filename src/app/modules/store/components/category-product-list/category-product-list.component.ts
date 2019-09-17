import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentInput } from '../../interfaces/component-input.interface';
import { map } from 'rxjs/operators';
import { RequestParam } from 'src/app/interfaces/request-param.interface';

@Component({
  selector: 'app-category-product-list',
  templateUrl: './category-product-list.component.html',
  styleUrls: ['./category-product-list.component.scss']
})
export class CategoryProductListComponent implements OnInit, OnChanges {
  @Input() store: string;
  @Input() category: string;
  filters: RequestParam[] = [];
  inputObserver: BehaviorSubject<ComponentInput> = new BehaviorSubject(null);

  constructor() {}

  ngOnInit() {
    this.inputObserver.next({
      category: this.category,
      store: this.store
    });
    this.inputObserver.pipe(
      map(input => input.category)
    ).subscribe(categoryId => this.filters = [{property: 'filter[category_id]', value: `eq,${categoryId}`}]);
  }

  ngOnChanges(changes: SimpleChanges) {
    const change: ComponentInput = {};
    if (changes.category) {
      change.category = changes.category.currentValue;
      this.inputObserver.next(change);
    }
  }

}
