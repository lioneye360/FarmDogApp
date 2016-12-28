import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
import { MenuComponent } from './menu.component';
import { DataService }   from './data.service';
import { FilterPipe }   from './filter.pipe';
import { OrderByPipe }   from './orderBy.pipe';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    FilterPipe,
    OrderByPipe
  ],
  providers:  [ DataService ],
  bootstrap:  [ AppComponent ]
})
export class AppModule { }
