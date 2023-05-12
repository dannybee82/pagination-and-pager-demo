import { Component } from '@angular/core';

//Services.
import { PersonsService } from 'src/app/services/persons.service';
import { PageService } from 'src/app/services/page.service';

//Models.
import { Person } from 'src/app/models/Person';

//Shared functions.
import { Pagination } from 'src/app/shared_functions/Pagination';

@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.css']
})
export class ShowTableComponent extends Pagination {

  public allPersons?: Person[];

  constructor(private personsService: PersonsService, pageService: PageService) {
    super(pageService);
    
    //Listen for changes.
    this.getCurrentData().subscribe({
      next: (result) => {
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
  }

  ngOnInit() {
    this.personsService.generateRandomPersons(25);    
    this.allPersons = this.personsService.getAllPersons();

    //Set data for pagination.
    this.setData(this.allPersons);    
    this.updatePagination();
  }

}