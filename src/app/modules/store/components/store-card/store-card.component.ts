import { Component, OnInit, Input } from '@angular/core';
import { DigitalCenter } from 'src/app/model/digital-center.interface';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-store-card]',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss']
})
export class StoreCardComponent implements OnInit {
  @Input() store: DigitalCenter;
  constructor() { }

  ngOnInit() {}

}
