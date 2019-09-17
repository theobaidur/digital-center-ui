import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { RequestParam } from 'src/app/interfaces/request-param.interface';
import { BehaviorSubject, of } from 'rxjs';
import { ComponentInput } from '../../interfaces/component-input.interface';
import { map, switchMap, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { StoreManagerService } from '../../services/store-manager.service';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { Category } from '../../models/category.model';
import { CategoryManagerService } from '../../services/category-manager.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnChanges {
  @Input() store: string;
  @Input() category: string;
  filters: RequestParam[] = [];
  inputObserver: BehaviorSubject<ComponentInput> = new BehaviorSubject(null);
  storeDetails: DigitalCenter;
  categoryDetails: Category;
  constructor(
    private storeManager: StoreManagerService,
    private route: ActivatedRoute,
    private categoryManager: CategoryManagerService) {}

  ngOnInit() {
    this.inputObserver.next({
      category: this.category,
      store: this.store,
    });

    this.inputObserver.pipe(
      filter(input => input && input.category),
      switchMap(input => this.categoryManager.resolve(input.category))
    ).subscribe(category => this.categoryDetails = category);

    this.inputObserver.pipe(
      switchMap(() => this.store ? this.storeManager.resolveBySlug(this.store) : of(null))
    ).subscribe((center: DigitalCenter) => {
      const existingInput = this.inputObserver.getValue() || {};
      const filters: RequestParam[] = [];
      this.storeDetails = center;
      if (existingInput.category) {
        filters.push({
          property: 'filter[category_id]',
          value: `eq,${existingInput.category}`
        });
      }
      if (existingInput.search) {
        filters.push({
          property: 'search',
          value: existingInput.search
        });
      }
      this.filters = filters;
    });

    this.route.queryParams
    .pipe(
      map(params => params.search),
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(search => {
      const existingInput = this.inputObserver.getValue() || {};
      existingInput.search = search;
      this.inputObserver.next(existingInput);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const change: ComponentInput = {};
    if (changes.category) {
      change.category = changes.category.currentValue;
      this.inputObserver.next(change);
    }
  }

}
