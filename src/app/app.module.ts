import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationAndPagerDemoModule } from './components/pagination-and-pager-demo.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PaginationAndPagerDemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }