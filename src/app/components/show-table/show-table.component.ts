import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { PersonsService } from '../../services/persons.service';
import { PageService } from '../../services/page.service';
import { Person } from '../../models/person.interface';
import { SortState } from '../../models/sort-state.interface';
import { Pagination } from '../../shared_functions/Pagination';
import { FilterFunctions } from '../../shared_functions/FilterFunctions';
import { PagerComponent } from '../pager/pager.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { FilterComponent } from '../filter/filter.component';
import { SortFunctions } from '../../shared_functions/SortFunctions';
import { ToggleColumnComponent } from '../toggle-column/toggle-column.component';
import { DisplayColumnsService } from '../../services/display-columns.service';
import { TableHeadComponent } from './table-head/table-head.component';

@Component({
	imports: [
		PagerComponent,
		PaginationComponent,
		FilterComponent,
    ToggleColumnComponent,
    TableHeadComponent
	],
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss']
})
export class ShowTableComponent extends Pagination implements OnInit {

  allPersons: WritableSignal<Person[]> = signal([]);
  sortState: WritableSignal<SortState> = signal({
    sortField: '',
    isAscending: false
  });

  generatePersons: number = 25;

  displayColumns: string[] = [];

  private _filter: FilterFunctions = new FilterFunctions();
  private _sort: SortFunctions = new SortFunctions();
  private _defaultSortState: SortState = {
    sortField: '',
    isAscending: false
  };

	constructor(
    private displayColumnsService: DisplayColumnsService,
    private personsService: PersonsService,
    pageService: PageService
  ) {
    super(pageService);
  }

  ngOnInit() {
    this.displayColumns = this.displayColumnsService.displayColumns.getValue();

    this.displayColumnsService.displayColumns.subscribe((data: string[]) => {
      this.displayColumns = data;
    });

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

  getValue(person: Person, property: string): string {
    const key: keyof Person = property as keyof typeof person;
    return person[key].toString();
  }

  filterPersons(value: string) : void {
    if(value !== '') {
      this.allPersons.set(this._filter.filterObject(this.personsService.getAllPersons(), value));
    } else {
      this.allPersons.set(this.personsService.getAllPersons());
    }

    this.setData(this.allPersons());  
  }

  sortTable(state: SortState): void {
    if(this.sortState().sortField === state.sortField && this.sortState().isAscending === state.isAscending) {
      //Restore default state.
      this.sortState.set(this._defaultSortState);
      this.personsService.setUpdatePersons(true);     
    } else {
      //Change state.
      this.sortState.set({ sortField: state.sortField, isAscending: state.isAscending});
      this._sort.sort(this.allPersons(), state.sortField, state.isAscending);
    }
  }

}