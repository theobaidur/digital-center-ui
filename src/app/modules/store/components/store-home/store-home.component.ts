import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrls: ['./store-home.component.scss']
})
export class StoreHomeComponent implements OnInit, OnChanges {
  @Input() store: string;
  constructor(
    private seoService: SeoService
  ) { }

  ngOnInit() {
  }
  ngOnChanges(c) {
    console.log(c);
  }
}
