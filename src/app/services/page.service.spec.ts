import { TestBed } from '@angular/core/testing';
import { PageService } from './page.service';
import { beforeEach, describe, expect, it } from "Vitest";

describe('PageService', () => {
  let service: PageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('test records per page - ReplaySubject', () => {   
    let amountOfTests: number = 8;
   
    let testNextValue: number = -1;
    let expectation: number = 0;

    service.getRecordsPerPage().subscribe({
      next: (result) => {
        if(testNextValue == -1) {
          expect(result).toBe(expectation);
          testNextValue = 0;
          expectation = 0;
        } else if(testNextValue == 0) {
          expect(result).toBe(expectation);
          testNextValue = 1;
          expectation = 1;
        } else if(testNextValue == 1) {
          expect(result).toBe(expectation);
          testNextValue = 5;
          expectation = 5;
        } else if(testNextValue == 5) {
          expect(result).toBe(expectation);
          testNextValue = 10;
          expectation = 10;
        } else if(testNextValue == 10) {
          expect(result).toBe(expectation);
          testNextValue = 25;
          expectation = 25;
        } else if(testNextValue == 25) {
          expect(result).toBe(expectation);
          testNextValue = 50;
          expectation = 50;
        } else if(testNextValue == 50) {
          expect(result).toBe(expectation);
          testNextValue = 100;
          expectation = 100;
        } else if(testNextValue == 100) {
          expect(result).toBe(expectation);
        }        
      },
      complete: () => {
        setTimeout(() => {}, 500);        
      }
    });

    for(let i = 0; i < amountOfTests; i++) {
      service.setRecordsPerPage(testNextValue);      
    }    
  });


  it('test amount of pages - ReplaySubject', () => {
    let amountOfTests: number = 8;

    let testNextValue: number = -1;
    let expectation: number = 0;

    service.getPagesAmount().subscribe({
      next: (result) => {
        if(testNextValue == -1) {
          expect(result).toBe(expectation);
          testNextValue = 0;
          expectation = 0;
        } else if(testNextValue == 0) {
          expect(result).toBe(expectation);
          testNextValue = 1;
          expectation = 1;
        } else if(testNextValue == 1) {
          expect(result).toBe(expectation);
          testNextValue = 5;
          expectation = 5;
        } else if(testNextValue == 5) {
          expect(result).toBe(expectation);
          testNextValue = 10;
          expectation = 10;
        } else if(testNextValue == 10) {
          expect(result).toBe(expectation);
          testNextValue = 25;
          expectation = 25;
        } else if(testNextValue == 25) {
          expect(result).toBe(expectation);
          testNextValue = 50;
          expectation = 50;
        } else if(testNextValue == 50) {
          expect(result).toBe(expectation);
          testNextValue = 100;
          expectation = 100;
        } else if(testNextValue == 100) {
          expect(result).toBe(expectation);
        }        
      },
      complete: () => {
        setTimeout(() => {}, 500);
      }
    });

    for(let i = 0; i < amountOfTests; i++) {
      service.setPagesAmount(testNextValue);      
    }
  });


  it('test current page index - ReplaySubjec', () => {
    let amountOfTests: number = 8;

    let testNextValue: number = -1;
    let expectation: number = 0;

    service.getCurrentPageIndex().subscribe({
      next: (result) => {
        if(testNextValue == -1) {
          expect(result).toBe(expectation);
          testNextValue = 0;
          expectation = 0;
        } else if(testNextValue == 0) {
          expect(result).toBe(expectation);
          testNextValue = 1;
          expectation = 1;
        } else if(testNextValue == 1) {
          expect(result).toBe(expectation);
          testNextValue = 5;
          expectation = 5;
        } else if(testNextValue == 5) {
          expect(result).toBe(expectation);
          testNextValue = 10;
          expectation = 10;
        } else if(testNextValue == 10) {
          expect(result).toBe(expectation);
          testNextValue = 25;
          expectation = 25;
        } else if(testNextValue == 25) {
          expect(result).toBe(expectation);
          testNextValue = 50;
          expectation = 50;
        } else if(testNextValue == 50) {
          expect(result).toBe(expectation);
          testNextValue = 100;
          expectation = 100;
        } else if(testNextValue == 100) {
          expect(result).toBe(expectation);
        }        
      },
      complete: () => {
        setTimeout(() => {}, 500);
      }
    });

    for(let i = 0; i < amountOfTests; i++) {
      service.setCurrentPageIndex(testNextValue);      
    }
  });

  
});