import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-advertisement-edit',
  templateUrl: './advertisement-edit.component.html',
  styleUrls: ['./advertisement-edit.component.scss']
})
export class AdvertisementEditComponent implements OnInit {
  @Input() digitalCenterId: string;
  constructor() { }

  ngOnInit() {
  }

}
