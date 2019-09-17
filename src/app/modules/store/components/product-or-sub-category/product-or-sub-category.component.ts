import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject, forkJoin, combineLatest } from 'rxjs';
import { Category } from '../../models/category.model';
import { StoreManagerService } from '../../services/store-manager.service';
import { CategoryManagerService } from '../../services/category-manager.service';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ComponentInput } from '../../interfaces/component-input.interface';
import { DigitalCenter } from 'src/app/model/digital-center.interface';

@Component({
  selector: 'app-product-or-sub-category',
  templateUrl: './product-or-sub-category.component.html',
  styleUrls: ['./product-or-sub-category.component.scss']
})
export class ProductOrSubCategoryComponent implements OnInit, OnChanges {
  @Input() store: string;
  @Input() category: string;
  categoryDetails: Category;
  storeDetails: DigitalCenter;
  subCategories: Category[] = [];
  inputObserver: BehaviorSubject<ComponentInput> = new BehaviorSubject(null);
  constructor(
    private storeManager: StoreManagerService,
    private categoryManager: CategoryManagerService  ) { }
  ngOnInit() {
    this.inputObserver.next({
      category: this.category,
      store: this.store
    });
    this.inputObserver.pipe(
      filter(() => !!(this.store && this.category)),
      switchMap(() => this.storeManager.resolveBySlug(this.store)),
      tap((store) => console.log(store)),
      switchMap(store => {
        this.storeDetails = store;
        const subCategoryQuery = this.categoryManager.categories(this.category);
        const categoryDetailQeury = this.categoryManager.resolve(this.category);
        return combineLatest(subCategoryQuery, categoryDetailQeury);
      }),
      tap(results => {
        console.log(results);
        this.subCategories = results[0];
        this.categoryDetails = results[1];
      })
    ).subscribe(results => {
      console.log(results);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const change: ComponentInput = {};
    if (changes.store) {
      change.store = changes.store.currentValue;
    }
    if (changes.category) {
      change.category = changes.category.currentValue;
    }
    if (change.category || change.store) {
      this.inputObserver.next(change);
    }
  }

}
