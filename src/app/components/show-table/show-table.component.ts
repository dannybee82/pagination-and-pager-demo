import { Component } from '@angular/core';

//Services.
import { PersonsService } from 'src/app/services/persons.service';
import { PageService } from 'src/app/services/page.service';

//Models.
import { Person } from 'src/app/models/Person';

//Shared functions.
import { Pagination } from 'src/app/shared_functions/Pagination';
import { FilterFunctions } from 'src/app/shared_functions/FilterFunctions';
import { PagerComponent } from 'src/app/components/pager/pager.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { FilterComponent } from 'src/app/components/filter/filter.component';

@Component({
	standalone: true,
	imports: [
		PagerComponent,
		PaginationComponent,
		FilterComponent,
	],
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.css']
})
export class ShowTableComponent extends Pagination {

  private _originalPersons?: Person[];
  public allPersons?: Person[];

  public generatePersons: number = 25;

  private _filter: FilterFunctions = new FilterFunctions();

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
        this._originalPersons = result;
        this.allPersons = result;
      }
    });

    //Listen for changes.
    this.personsService.getUpdatePersons().subscribe({
      next: (result) => {
        if(result) {
          this.allPersons = this.personsService.getAllPersons();
          this.setData(this.allPersons);    
          this.updatePagination();
        }
      }
    });

    this.personsService.generateRandomPersons(this.generatePersons);    
    this.allPersons = this.personsService.getAllPersons();

    //Set data for pagination.
    this.setData(this.allPersons);    
    this.updatePagination();     
  }

  filterPersons(value: string) : void {
    if(value !== '') {
      this.allPersons = this._filter.filterObject(this.allPersons, value);
    } else {
      this.allPersons = this._originalPersons;
    }
  }

}