import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.scss']
})
export class AdvertisementListComponent implements OnInit {
  @Input() digitalCenterId: string;
  constructor() { }

  ngOnInit() {
  }

}
