import { WritableSignal, signal } from '@angular/core';
import { PageService } from '../services/page.service';
import { ReplaySubject } from 'rxjs';

export class Pagination {

  private _recordsPerPage: number = -1;
  private _currentPageIndex: number = -1;

  private _originalData: any;
  private _workData: any;

  private _data: ReplaySubject<any>;

  private pageService: PageService;

  public totalRecords: WritableSignal<number> = signal(0);

  constructor(pageService: PageService) {
    this.pageService = pageService;
    this.pageService.resetAll();

    //Subscribe to changes in amount of pages. When updating records per page -> set _currentPageIndex to 0.
    this.pageService.getRecordsPerPage().subscribe({
        next: (result) => {
          if(result != this._recordsPerPage) {
            this._recordsPerPage = result;
            this._currentPageIndex = 0;
            this.pageService.setCurrentPageIndex(this._currentPageIndex);
            this.updatePagination();
          }
        }
    });

    //Subscribe to changes in page index.
    this.pageService.getCurrentPageIndex().subscribe({
      next: (result) => {
        if(result != this._recordsPerPage) { 
          this._currentPageIndex = result;
          this.updatePagination();
        }
      }      
    });

    //Register ReplaySubject.
    this._data = new ReplaySubject<any>(undefined);
  }

  calculatePages(obj: any, recordsPerPage: number) : number {
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

  limitRecords(obj: any, recordsPerPage: number, currentPageIndex: number) : any | undefined {
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
    this._originalData = data;

    if(this._originalData != undefined) {
      this._workData = this._originalData;
      let pages = this.calculatePages(this._originalData, this._recordsPerPage);
      this.pageService.setPagesAmount(pages);

      this.totalRecords.set(this._workData.length);
    }
  }

  updatePagination() : void {
    if(this._originalData != undefined) {  
      this._workData = this._originalData;    
      this._workData = this.limitRecords(this._workData, this._recordsPerPage, this._currentPageIndex);
      this._data.next(this._workData);
    }
  }

  getCurrentData() : ReplaySubject<any> {
    return this._data;
  }

  getTotalRecords() : void {
    if(this._originalData != undefined) {
      this.totalRecords.set(this._originalData.length);
    }

    this.totalRecords.set(0);
  }

  getCurrentShowing() : string {
    if(this._workData != undefined) {
      let start: number = this.calculateStart(this._recordsPerPage, this._currentPageIndex)
      return (start + 1) + " - " + this.calculateEnd(start, this._originalData.length, this._recordsPerPage); 
    }

    return "";
  }

  private checkNumber(value: number, defaultNumber: number) : number {
    return (value <= 0) ? defaultNumber : value;
  }

}