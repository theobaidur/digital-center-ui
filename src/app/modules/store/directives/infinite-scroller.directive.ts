import { ElementRef, Input, OnInit, Output, EventEmitter, OnDestroy, Directive } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
export interface InfiniteScrollbarConfig {
  height?: number;
  windowScroll?: boolean;
  distance?: number;
  unit?: string;
  reverse?: boolean;
}

@Directive({
  selector: '[appInfiniteScroller]'
})
export class InfiniteScrollerDirective implements OnInit, OnDestroy {
  @Input() scrollConfig: InfiniteScrollbarConfig;
  @Output() scrolled: EventEmitter<number> = new EventEmitter();
  config: InfiniteScrollbarConfig = {
    height: 200,
    windowScroll: false,
    distance: 80,
    unit: 'px',
    reverse: false
  };
  constructor(private element: ElementRef) { }
  ngOnInit() {
    if (this.scrollConfig) {
      this.config = {...this.config, ...this.scrollConfig};
    }
    let scrollElem: Element | Document;
    if (!this.config.windowScroll) {
      const nativeEl = this.element.nativeElement;
      nativeEl.style.maxHeight = this.config.height + this.config.unit;
      nativeEl.style.overflow = 'auto';
      scrollElem = nativeEl;
    } else {
      scrollElem = document;
    }
    fromEvent(scrollElem, 'scroll').pipe(
      untilDestroyed(this),
      map((e: MouseEvent) => {
        const target: HTMLElement = (!this.config.windowScroll ? e.target : (e.target as any).documentElement) as HTMLElement;
        return target.scrollTop * 100 / (target.scrollHeight - target.clientHeight);
      }),
      filter(pt => {
        if (this.config.reverse) {
          const d = 100 - this.config.distance;
          return pt < d;
        }
        return pt > this.config.distance;
      }),
    ).subscribe(pt => this.scrolled.emit(pt));
  }

  ngOnDestroy() {}
}
