import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {
  @Input() store: string;
  constructor() { }

  ngOnInit() {
  }

}
