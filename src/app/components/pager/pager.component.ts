import { Component } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})

export class PagerComponent {

  public productsPerPage?: number;

  constructor(private pageService: PageService) {
    this.productsPerPage = this.pageService.getDefaultRecordsPerPage();
    this.pageService.setRecordsPerPage(this.productsPerPage);
  }

  changePageSize(size: string) {    
    let parsed = parseInt(size);

    if(this.productsPerPage != parsed) {
      this.productsPerPage = parsed;
      this.pageService.setRecordsPerPage(parsed);
    }    
  }

}