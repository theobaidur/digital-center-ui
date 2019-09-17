import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrls: ['./store-home.component.scss']
})
export class StoreHomeComponent implements OnInit, OnChanges {
  @Input() store: string;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(c) {
    console.log(c);
  }
}
