import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AttachmentManagerService } from '../../services/attachment-manager.service';
import { distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ComponentInput } from '../../interfaces/component-input.interface';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-image-viewer]',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() type: string;
  url: string;
  inputObserver: BehaviorSubject<ComponentInput> = new BehaviorSubject(null);
  constructor(private attachmentManager: AttachmentManagerService) { }

  ngOnInit() {
    this.inputObserver.next({
      id: this.id,
      type: this.type
    });
    this.inputObserver.pipe(
      filter(() => !!this.id),
      distinctUntilChanged(),
      switchMap(() => this.attachmentManager.resolve(this.id))
    ).subscribe(({url}) => this.url = url);
  }

  ngOnChanges(changes: SimpleChanges) {
    const change: ComponentInput = {};
    if (changes.id) {
      change.id = changes.id.currentValue;
    }
    if (changes.type) {
      change.type = changes.type.currentValue;
    }

    this.inputObserver.next(change);
  }

}
