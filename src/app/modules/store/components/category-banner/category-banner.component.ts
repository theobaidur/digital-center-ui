import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Category } from '../../models/category.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { ComponentInput } from '../../interfaces/component-input.interface';
import { CategoryManagerService } from '../../services/category-manager.service';
import { map, switchMap } from 'rxjs/operators';
import { SeoService } from 'src/app/services/seo.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-category-banner',
  templateUrl: './category-banner.component.html',
  styleUrls: ['./category-banner.component.scss']
})
export class CategoryBannerComponent implements OnInit, OnChanges {
  @Input() store: string;
  @Input() category: string;
  categoryDetails: Category;
  seoUpdater: BehaviorSubject<any> = new BehaviorSubject(false);
  inputObserver: BehaviorSubject<ComponentInput> = new BehaviorSubject(null);

  constructor(
    private categoryManager: CategoryManagerService,
    private seoService: SeoService,
    private languageService: LanguageService
    ) {}

  ngOnInit() {
    this.inputObserver.next({
      category: this.category,
      store: this.store
    });
    this.inputObserver.pipe(
      map(input => input.category),
      switchMap(categoryId => this.categoryManager.resolve(categoryId))
    ).subscribe(category => {
      this.categoryDetails = category;
      this.seoUpdater.next(true);
    });

    this.languageService.language.subscribe(lng => this.seoUpdater.next(true));

    this.seoUpdater.subscribe(() => {
      const lng = this.languageService.language.getValue().toLowerCase() === 'bn' ? '_bn' : '';
      const category: Category = this.categoryDetails;
      if (category) {
        const title = category['name' + lng] || category.name;
        const description = category['related_name' + lng] || category.related_name;
        const url = window.location.href;
        const image = category.category_thumb;
        const withPrefix = false;
        this.seoService.updateTag({title, withPrefix, description, url, image});
      }
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
