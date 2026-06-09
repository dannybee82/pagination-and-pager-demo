import { Component, OnInit, WritableSignal, signal, inject } from '@angular/core';
import { Persons } from '../../services/persons';
import { Page } from '../../services/page';
import { Person } from '../../models/person.interface';
import { SortState } from '../../models/sort-state.interface';
import { PaginationFunctions } from '../../shared_functions/Pagination';
import { FilterFunctions } from '../../shared_functions/FilterFunctions';
import { Pager } from '../pager/pager';
import { Pagination } from '../pagination/pagination';
import { Filter } from '../filter/filter';
import { SortFunctions } from '../../shared_functions/SortFunctions';
import { ToggleColumn } from '../toggle-column/toggle-column';
import { DisplayColumns } from '../../services/display-columns';
import { TableHead } from './table-head/table-head';

@Component({
	imports: [
		Pager,
		Pagination,
		Filter,
    ToggleColumn,
    TableHead
	],
  selector: 'app-show-table',
  templateUrl: './show-table.html',
  styleUrls: ['./show-table.scss']
})
export class ShowTable extends PaginationFunctions<Person> implements OnInit {

  protected allPersons: WritableSignal<Person[]> = signal([]);
  protected sortState: WritableSignal<SortState> = signal({
    sortField: '',
    isAscending: false
  });

  protected generatePersons: number = 25;

  protected displayColumns: WritableSignal<string[]> = signal([]);

  private _filter: FilterFunctions = new FilterFunctions();
  protected isFilterOn: WritableSignal<boolean> = signal(false);
  private _sort: SortFunctions = new SortFunctions();
  private _defaultSortState: SortState = {
    sortField: '',
    isAscending: false
  };

  private displayColumnsService = inject(DisplayColumns);
	private personsService = inject(Persons);

  constructor(pageService: Page) {
    super(pageService);
  }

  ngOnInit() {
    this.displayColumns.set(this.displayColumnsService.displayColumns.getValue());

    this.displayColumnsService.displayColumns.subscribe((data: string[]) => {
      this.displayColumns.set(data);
    });

    if(this.generatePersons < 0) {
      this.generatePersons = 0;
    }

     //Listen for changes.
     this.getCurrentData().subscribe({
      next: (result: Person[] | undefined) => {
        this.allPersons.set(result ? result : []);       
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
    this.totalRecords.set(this.personsService.getAllPersons().length);

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
      this.isFilterOn.set(true);
    } else {
      this.allPersons.set(this.personsService.getAllPersons());
      this.isFilterOn.set(false);
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