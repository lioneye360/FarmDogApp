import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent }   from './menu.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'prefix' },
  { path: '',  component: MenuComponent , pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
