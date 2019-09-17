import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { StoreUiService } from '../../services/store-ui.service';
import { StoreService } from '../../services/store.service';
import { SearchOrigin } from '../../interfaces/search-info.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() store = 'host';
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef<HTMLInputElement>;
  query: string;
  constructor(
    private uiService: StoreUiService,
    private storeService: StoreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(query => {
      if (!(query.search && query.origin)) {
        this.query = '';
      }
      if (query.search && +query.origin !== SearchOrigin.GLOBAL_SEARCH) {
        this.query = query.search;
      }
      if (query.search && +query.origin === SearchOrigin.STORE_BANNER) {
        this.searchInput.nativeElement.focus();
      }
    });
  }

  toggleSideNav() {
    this.uiService.collapseSideNav.next(!this.uiService.collapseSideNav.value);
  }

  keyup() {
    this.storeService.searchKeyUp.next({
      query: this.query,
      origin: SearchOrigin.GLOBAL_SEARCH
    });
  }

}
