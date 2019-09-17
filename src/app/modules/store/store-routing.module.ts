import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreBaseComponent } from './pages/store-base/store-base.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: StoreBaseComponent
  },
  {
    path: ':slug',
    component: StoreBaseComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
