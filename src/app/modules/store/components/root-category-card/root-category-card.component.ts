import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root-category-card',
  templateUrl: './root-category-card.component.html',
  styleUrls: ['./root-category-card.component.scss']
})
export class RootCategoryCardComponent implements OnInit {
  @Input() category: Category;
  @Input() store: string;
  storeSlug: string;
  constructor() { }

  ngOnInit() {
  }

  get url() {
    const parts = ['/shop'];
    if (this.category) {
      parts.push(this.category.slug);
    }
    return parts.join('/');
  }

  get params() {
    if (this.store) {
      return {store: this.store};
    }
    return null;
  }

}
