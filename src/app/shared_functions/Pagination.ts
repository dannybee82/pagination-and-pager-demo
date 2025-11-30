import { WritableSignal, signal } from '@angular/core';
import { PageService } from '../services/page.service';
import { ReplaySubject } from 'rxjs';

export class Pagination<T> {

  private _recordsPerPage: WritableSignal<number> = signal(-1);
  private _currentPageIndex: WritableSignal<number> = signal(-1);

  private _originalData: WritableSignal<T[] | undefined> = signal(undefined);
  private _workData: WritableSignal<T[] | undefined> = signal(undefined);

  private _data: ReplaySubject<T[] | undefined>;

  private pageService: PageService;

  public totalRecords: WritableSignal<number> = signal(0);

  constructor(pageService: PageService) {
    this.pageService = pageService;
    this.pageService.resetAll();

    //Subscribe to changes in amount of pages. When updating records per page -> set _currentPageIndex to 0.
    this.pageService.getRecordsPerPage().subscribe({
        next: (result) => {
          if(result != this._recordsPerPage()) {
            this._recordsPerPage.set(result);
            this._currentPageIndex.set(0);
            this.pageService.setCurrentPageIndex(this._currentPageIndex());
            this.updatePagination();
          }
        }
    });

    //Subscribe to changes in page index.
    this.pageService.getCurrentPageIndex().subscribe({
      next: (result) => {
        //if(result != this._recordsPerPage()) { 
          this._currentPageIndex.set(result);
          this.updatePagination();
        //}
      }      
    });

    //Register ReplaySubject.
    this._data = new ReplaySubject<T[] | undefined>(undefined);
  }

  calculatePages(obj: T[] | undefined, recordsPerPage: number) : number {
      if(obj != undefined) {
        recordsPerPage = this.checkNumber(recordsPerPage, 1);

        let pages: number = Math.floor(obj.length / recordsPerPage);
    
        if(obj.length % recordsPerPage != 0) {
          pages += 1;
        }
    
        return pages;
      }
        
      return 0;
  }

  limitRecords(obj: T[], recordsPerPage: number, currentPageIndex: number) : T[] | undefined {
      if(obj != undefined) {
        recordsPerPage = this.checkNumber(recordsPerPage, 1);
        currentPageIndex = this.checkNumber(currentPageIndex, 0);

        let pages: number = this.calculatePages(obj, recordsPerPage);      
        this.pageService.setPagesAmount(pages);    
    
        let start: number = this.calculateStart(recordsPerPage, currentPageIndex);
        let end: number = this.calculateEnd(start, obj.length, recordsPerPage);
    
        obj = obj.slice(start, end);
        return obj;
      }

      return undefined;
  }

  calculateStart(recordsPerPage: number, currentPageIndex: number) : number {
    recordsPerPage = this.checkNumber(recordsPerPage, 1);
    let start: number = (currentPageIndex == -1) ? 0 : currentPageIndex;
    return start *= recordsPerPage;
  }
    
  calculateEnd(start: number, dataLength: number, recordsPerPage: number) : number {
    start = this.checkNumber(start, 0);
    dataLength = this.checkNumber(dataLength, 0);
    recordsPerPage = this.checkNumber(recordsPerPage, 1);

    return (start + recordsPerPage <= dataLength) ? (start + recordsPerPage) : start + (dataLength % recordsPerPage);
  }
   
  setData(data: any) {
    this._originalData.set(data);

    if(this._originalData() != undefined && this._workData() != undefined) {
      this._workData.set(this._originalData());
      let pages = this.calculatePages(this._originalData(), this._recordsPerPage());
      this.pageService.setPagesAmount(pages);

      this.totalRecords.set(this._workData()!.length);
    }
  }

  updatePagination() : void {
    if(this._originalData() != undefined) {  
      this._workData.set(this._originalData());    
      this._workData.set(this.limitRecords(this._workData()!, this._recordsPerPage(), this._currentPageIndex()));
      this._data.next(this._workData());
    }
  }

  getCurrentData() : ReplaySubject<T[] | undefined> {
    return this._data;
  }

  getTotalRecords() : void {
    if(this._originalData() != undefined) {
      this.totalRecords.set(this._originalData()!.length);
    } else {
      this.totalRecords.set(0);
    }    
  }

  getCurrentShowing() : string {
    if(this._workData != undefined && this._originalData() != undefined) {
      let start: number = this.calculateStart(this._recordsPerPage(), this._currentPageIndex())
      return (start + 1) + " - " + this.calculateEnd(start, this._originalData()!.length, this._recordsPerPage()); 
    }

    return "";
  }

  private checkNumber(value: number, defaultNumber: number) : number {
    return (value <= 0) ? defaultNumber : value;
  }

}