import { PageService } from '../services/page.service';
import { ReplaySubject } from 'rxjs';

export class Pagination {

  private _recordsPerPage: number = -1;
  private _currentPageIndex: number = -1;

  private _originalData: any;
  private _workData: any;

  private _data: ReplaySubject<any>;

  private pageService: PageService;

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
        let pages: number = Math.floor(obj.length / recordsPerPage);
    
        if(obj.length % recordsPerPage != 0) {
          pages += 1;
        }
    
        return pages;
      }
        
      return -1;
  }

  limitRecords(obj: any, recordsPerPage: number, currentPageIndex: number) : any {
      if(obj != undefined) {
        let pages: number = this.calculatePages(obj, recordsPerPage);      
        this.pageService.setPagesAmount(pages);    
    
        let start: number = this.calculateStart(recordsPerPage, currentPageIndex );
        let end: number = this.calculateEnd(start, obj.length, recordsPerPage);
    
        obj = obj.slice(start, end);
        return obj;
      }
  }

  calculateStart(recordsPerPage: number, currentPageIndex: number) : number {
      let start: number = (currentPageIndex == -1) ? 0 : currentPageIndex;
      return start *= recordsPerPage;
  }
    
  calculateEnd(start: number, allPersonsLength: number, recordsPerPage: number) : number {
      let end: number = (start + recordsPerPage < allPersonsLength) ?  (start + recordsPerPage): start + (allPersonsLength % recordsPerPage);
      return end;
  }
   
  setData(data: any) {
    this._originalData = data;

    if(this._originalData != null) {
      this._workData = this._originalData;
      let pages = this.calculatePages(this._originalData, this._recordsPerPage);
      this.pageService.setPagesAmount(pages);
    }
  }

  updatePagination() : void {
    if(this._originalData != null) {  
      this._workData = this._originalData;    
      this._workData = this.limitRecords(this._workData, this._recordsPerPage, this._currentPageIndex);
      this._data.next(this._workData);
    }
  }

  getCurrentData() : ReplaySubject<any> {
    return this._data;
  }

}