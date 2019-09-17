import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { StoreManagerService } from '../../services/store-manager.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-other-stores',
  templateUrl: './other-stores.component.html',
  styleUrls: ['./other-stores.component.scss']
})
export class OtherStoresComponent implements OnInit, OnDestroy {
  @ViewChild('elem', {static: false}) elem: ElementRef;
  @ViewChild('viewport', {static: false}) viewport: ElementRef;
  @Input() store: string;
  stores: DigitalCenter[] = [];
  marginLeft = 0;
  timer: any;
  constructor(
    private storeManager: StoreManagerService
  ) { }

  ngOnInit() {
    this.storeManager.all
    .pipe(
      untilDestroyed(this),
      distinctUntilChanged(),
    )
    .subscribe(list => {
      this.stores = [...list];
    });
    this.rotate();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  get slides() {
    return this.stores.filter(item => !this.store || item.slug !== this.store);
  }

  get viewportWidth() {
    if (this.viewport && this.viewport.nativeElement && (this.viewport.nativeElement as HTMLElement).clientWidth) {
      return (this.viewport.nativeElement as HTMLElement).clientWidth;
    }
    return 320;
  }

  goto(direction: 'next' | 'prev') {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (direction === 'next') {
      this.rotate();
    }
    if (direction === 'prev') {
      this.rotate(true);
    }
  }

  rotate(reverse: boolean = false) {

    if (reverse) {
      if (this.marginLeft - 320 >= 320) {
        this.marginLeft -= 320;
      } else {
        this.marginLeft = 0;
      }
    } else {
      const maxViewportItem = this.viewportWidth / 320;
      const itemShown = this.marginLeft / 320;
      const itemRemaining = Math.round((this.slides.length - itemShown - maxViewportItem) * 100) / 100;
      if (itemRemaining > 1) {
        this.marginLeft += 320;
      } else if (itemRemaining) {
        this.marginLeft += 320 * itemRemaining;
      } else {
        this.marginLeft = 0;
      }
    }

    this.timer = setTimeout(() => this.rotate(), 3000);
  }

  get sliderStyle() {
    return {
      width: `${320 * this.slides.length}px`,
      marginLeft: `-${this.marginLeft}px`
    };
  }

  get params() {
    return {
      store: this.store
    };
  }
}
