import { Component, OnInit, inject } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
	standalone: true,
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})

export class PagerComponent implements OnInit {

  public productsPerPage?: number;

  public options: number[] = [5, 10, 25, 50, 100];

	private pageService = inject(PageService);

  ngOnInit() : void {
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