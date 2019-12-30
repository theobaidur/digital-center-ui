import { Component, OnInit, Input } from '@angular/core';
import { BiggaponService } from 'src/app/modules/admin/services/biggapon.service';
import { Biggapon } from 'src/app/modules/admin/models/biggapon.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-promotion',
  templateUrl: './store-promotion.component.html',
  styleUrls: ['./store-promotion.component.scss']
})
export class StorePromotionComponent implements OnInit {
  @Input() location: 'top' | 'bottom' = 'top';
  ads: Biggapon[] = [];
  constructor(
    private adService: BiggaponService,
    private router: Router
  ) { }

  ngOnInit() {
    this.adService.all.subscribe(list=>{
      this.ads = list.filter(item=> item.location.indexOf(this.location) > -1);
    });
  }

  get colClass(){
    let size = 6;
    if(this.ads.length === 1){
      size = 12;
    }
    return `col-md-${size}`;
  }

  click(e: MouseEvent, ad: Biggapon){
    e.preventDefault();
    e.stopPropagation();
    if(ad.target.indexOf('http') === 0){
      window.location.href = ad.target;
    } else {
      try{
        this.router.navigate([ad.target]);
      } catch(e){
      }
    }
  }
}
