import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { StoreUiService } from '../../services/store-ui.service';
import { StoreService } from '../../services/store.service';
import { SearchOrigin } from '../../interfaces/search-info.interface';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() store = 'host';
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef<HTMLInputElement>;
  query: string;
  language = 'EN';
  constructor(
    private uiService: StoreUiService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private languageService: LanguageService
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

    this.languageService.language.subscribe(lang => {
      if (lang.toLowerCase() === 'bn') {
        this.language = 'EN';
      } else {
        this.language = 'বাংলা';
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

  toggleLang() {
    if (this.languageService.language.getValue().toLowerCase() === 'bn') {
      this.languageService.language.next('EN');
    } else {
      this.languageService.language.next('BN');
    }
  }

}
