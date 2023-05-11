import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private _defaultRecordsPerPage: number = 10;
  private _recordsPerPage: ReplaySubject<number>;

  private _defaultAmountOfPage = 0;
  private _amountOfPages: ReplaySubject<number>;

  private _defaultCurrentPageIndex = 0;
  private _currentPageIndex: ReplaySubject<number>;
  
  constructor() {
    this._recordsPerPage = new ReplaySubject<number>(this._defaultRecordsPerPage);
    this._amountOfPages = new ReplaySubject<number>(0);
    this._currentPageIndex = new ReplaySubject<number>(0);
  }

  setRecordsPerPage(recordsPerPage: number) : void {
    this._recordsPerPage.next(recordsPerPage);
  }

  getRecordsPerPage() : ReplaySubject<number> {
    return this._recordsPerPage;
  }

  setPagesAmount(amount: number) : void {
    this._amountOfPages.next(amount);
  }

  getPagesAmount() : ReplaySubject<number> {
    return this._amountOfPages;
  }

  setCurrentPageIndex(index: number) : void {
    this._currentPageIndex.next(index);
  }

  getCurrentPageIndex() : ReplaySubject<number> {
    return this._currentPageIndex;
  }

  resetAll() : void {
    this.setRecordsPerPage(this._defaultRecordsPerPage);
    this.setPagesAmount(this._defaultAmountOfPage);
    this.setCurrentPageIndex(this._defaultCurrentPageIndex);
  }

  getDefaultRecordsPerPage() : number {
    return this._defaultRecordsPerPage;
  }

}