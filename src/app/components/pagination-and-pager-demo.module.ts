import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

//Services.
import { PersonsService } from '../services/persons.service';
import { PageService } from '../services/page.service';

//Components.
import { ShowTableComponent } from './show-table/show-table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PagerComponent } from './pager/pager.component';
import { AddPersonsFormComponent } from './add-persons-form/add-persons-form.component';
import { ScrollToTopAdminComponent } from './scroll-to-top/scroll-to-top.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    ShowTableComponent,
    PaginationComponent,
    PagerComponent,
    AddPersonsFormComponent,
    ScrollToTopAdminComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    PersonsService,
    PageService
  ],
  exports: [
    ShowTableComponent,
    AddPersonsFormComponent,
    ScrollToTopAdminComponent,
    FilterComponent
  ]
})
export class PaginationAndPagerDemoModule { }