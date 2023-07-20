import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyComponent } from './empty/empty.component';
import { HeroComponent } from './hero/hero.component';

const routes: Routes = [

  {
    path: 'hero',
    component:HeroComponent
  }  ,
  {
    path: 'mfe-angular-sub',
    component:EmptyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }