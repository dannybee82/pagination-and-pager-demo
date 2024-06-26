import { Component, OnInit, WritableSignal, signal } from '@angular/core';

//Services.
import { PersonsService } from 'src/app/services/persons.service';
import { PageService } from 'src/app/services/page.service';

//Models.
import { Person } from 'src/app/models/person.interface';

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
  styleUrls: ['./show-table.component.scss']
})
export class ShowTableComponent extends Pagination implements OnInit {

  public allPersons: WritableSignal<Person[]> = signal([]);

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

}