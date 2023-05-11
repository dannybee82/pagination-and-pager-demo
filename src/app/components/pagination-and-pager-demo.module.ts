import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Services.
import { PersonsService } from '../services/persons.service';
import { PageService } from '../services/page.service';

//Components.
import { ShowTableComponent } from './show-table/show-table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PagerComponent } from './pager/pager.component';

@NgModule({
  declarations: [
    ShowTableComponent,
    PaginationComponent,
    PagerComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    PersonsService,
    PageService
  ],
  exports: [
    ShowTableComponent
  ]
})
export class PaginationAndPagerDemoModule { }