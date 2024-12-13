import { Component, OnInit, WritableSignal, signal, inject } from '@angular/core';

//Services.
import { PersonsService } from 'src/app/services/persons.service';
import { PageService } from 'src/app/services/page.service';

//Interfaces / models.
import { Person } from 'src/app/models/person.interface';
import { SortState } from 'src/app/models/sort-state.interface';

//Shared functions.
import { Pagination } from 'src/app/shared_functions/Pagination';
import { FilterFunctions } from 'src/app/shared_functions/FilterFunctions';
import { PagerComponent } from 'src/app/components/pager/pager.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { SortFunctions } from 'src/app/shared_functions/SortFunctions';

@Component({
	imports: [
		PagerComponent,
		PaginationComponent,
		FilterComponent,
	],
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss']
})
export class ShowTableComponent extends Pagination implements OnInit {

  public allPersons: WritableSignal<Person[]> = signal([]);
  public sortState: WritableSignal<SortState> = signal({
    sortField: '',
    isAscending: false
  });

  public generatePersons: number = 25;

  private _filter: FilterFunctions = new FilterFunctions();
  private _sort: SortFunctions = new SortFunctions();
  private _defaultSortState: SortState = {
    sortField: '',
    isAscending: false
  };

	constructor(
    private personsService: PersonsService, 
    pageService: PageService
  ) {
    super(pageService);
  }

  ngOnInit() {
    if(this.generatePersons < 0) {
      this.generatePersons = 0;
    }

     //Listen for changes.
     this.getCurrentData().subscribe({
      next: (result) => {
        this.allPersons.set(result);
      }
    });

    //Listen for changes.
    this.personsService.getUpdatePersons().subscribe({
      next: (result) => {
        if(result) {
          this.allPersons.set(this.personsService.getAllPersons());
          this.setData(this.allPersons());    
          this.updatePagination();
        }
      }
    });

    this.personsService.generateRandomPersons(this.generatePersons);    
    this.allPersons.set(this.personsService.getAllPersons());

    //Set data for pagination.
    this.setData(this.allPersons());    
    this.updatePagination();     
  }

  filterPersons(value: string) : void {
    if(value !== '') {
      this.allPersons.set(this._filter.filterObject(this.personsService.getAllPersons(), value));
    } else {
      this.allPersons.set(this.personsService.getAllPersons());
    }

    this.setData(this.allPersons());  
  }

  sortTable(sortField: string, isAscending: boolean): void {
    if(this.sortState().sortField === sortField && this.sortState().isAscending === isAscending) {
      //Restore default state.
      this.sortState.set(this._defaultSortState);
      this.personsService.setUpdatePersons(true);     
    } else {
      //Change state.
      this.sortState.set({ sortField: sortField, isAscending: isAscending});
      this._sort.sort(this.allPersons(), sortField, isAscending);
    }
  }

}