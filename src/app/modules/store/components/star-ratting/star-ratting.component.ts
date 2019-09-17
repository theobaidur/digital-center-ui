import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star-ratting',
  templateUrl: './star-ratting.component.html',
  styleUrls: ['./star-ratting.component.scss']
})
export class StarRattingComponent implements OnInit {
  @Input() ratting = 0;
  @Input() rattingCount = 0;
  stars: string[] = [];
  constructor() { }

  ngOnInit() {
    this.ratting = +this.ratting;
    this.rattingCount = Math.floor(+this.rattingCount);
    const fullStars = Math.floor(this.ratting);
    const halfStars = Math.ceil(this.ratting % .5);
    const noStars = 5 - (fullStars + halfStars);
    for (let i = 0; i < fullStars; i++) {
      this.stars.push('fa fa-star');
    }
    for (let i = 0; i < halfStars; i++) {
      this.stars.push('fa fa-star-half-full');
    }
    for (let i = 0; i < noStars; i++) {
      this.stars.push('fa fa-star-o');
    }

  }

}
