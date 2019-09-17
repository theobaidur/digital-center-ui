import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-choose-sub-category',
  templateUrl: './choose-sub-category.component.html',
  styleUrls: ['./choose-sub-category.component.scss']
})
export class ChooseSubCategoryComponent implements OnInit {
  @Input() store: string;
  @Input() category: string;

  constructor() {}

  ngOnInit() {}

}
