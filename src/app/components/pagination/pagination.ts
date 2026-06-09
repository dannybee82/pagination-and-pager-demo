import { Component, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { Page } from '../../services/page';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.scss']
})
export class Pagination implements OnInit {

  public amountOfPages: WritableSignal<number> = signal(0);

  private _currentPageindex: WritableSignal<number> = signal(0);
  private _paginationAmount: WritableSignal<number> = signal(3);

  hasPrevious: Signal<boolean> = computed(() => {
    return this._currentPageindex() - 1 >= 0 ? false : true;
  });

  hasNext: Signal<boolean> = computed(() => {
    return this._currentPageindex() + 1 < this.amountOfPages() ? false : true;
  });

	private pageService = inject(Page);

  ngOnInit(): void {
    this.pageService.getPagesAmount().subscribe(result => {
      this.amountOfPages.set(result);
    });

    this.pageService.getCurrentPageIndex().subscribe(result => {
      this._currentPageindex.set(result);
    });
  }

  getPagination() : string[] {
    let start: number = (this._currentPageindex() - 1 <= 0) ? 0 : this._currentPageindex() - 1;
    let end: number = (start + this._paginationAmount() < this.amountOfPages()) ? start + this._paginationAmount() : this.amountOfPages();

    if(start + this._paginationAmount() > this.amountOfPages() && start - 1 >= 0) {
      start -= 1;
    }    

    let arr: string[] = [];
    
    for(let i = start; i < end; i++) {
      arr.push((i + 1) + "");
    }

    return arr;
  }

  isCurrentPageIndex(value: string) : boolean {
    let parsed: number = parseInt(value) - 1;
    return (parsed === this._currentPageindex()) ? true : false;
  }

  setPageIndex(value: string) : void {
    let parsed: number = parseInt(value) - 1;
    this._currentPageindex.set(parsed);
    this.pageService.setCurrentPageIndex(this._currentPageindex());
  }

  previousPage() : void {
    if(this._currentPageindex() - 1 >= 0) {
      this._currentPageindex.set(this._currentPageindex() - 1);
      this.pageService.setCurrentPageIndex(this._currentPageindex());
    }
  }

  nextPage() : void {
    if(this._currentPageindex() + 1 < this.amountOfPages()) {
      this._currentPageindex.set(this._currentPageindex() + 1);
      this.pageService.setCurrentPageIndex(this._currentPageindex());
    }
  }

}