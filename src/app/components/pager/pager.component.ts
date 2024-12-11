import { AfterViewInit, Component, ElementRef, OnInit, Signal, inject, viewChild } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
	standalone: true,
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})

export class PagerComponent implements OnInit, AfterViewInit {

  public productsPerPage?: number;
  public selectElement: Signal<ElementRef | undefined> = viewChild('selectEl');

  public options: number[] = [5, 10, 25, 50, 100];

	private pageService = inject(PageService);

  ngOnInit() : void {
    this.productsPerPage = this.pageService.getDefaultRecordsPerPage();
    this.pageService.setRecordsPerPage(this.productsPerPage);
  }

  ngAfterViewInit(): void {
    if(this.selectElement()) {
      let selectEl: HTMLSelectElement | undefined = this.selectElement()?.nativeElement;

      if(selectEl) {
        selectEl.value = this.productsPerPage != undefined ? this.productsPerPage.toString() !== '' ? this.productsPerPage?.toString()  : "10" : '10';
      }
    }
  }

  changePageSize($event: Event) {
    if($event.target instanceof HTMLSelectElement) {
      const el: HTMLSelectElement = $event.target as HTMLSelectElement;

      let parsed = parseInt(el.value);

      if(this.productsPerPage != parsed) {
        this.productsPerPage = parsed;
        this.pageService.setRecordsPerPage(parsed);
      }  
    }  
  }

}