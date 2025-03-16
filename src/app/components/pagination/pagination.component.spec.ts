import { ComponentFixture, TestBed, waitForAsync, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PaginationComponent } from './pagination.component';

import { PageService } from '../../services/page.service';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  let isNext: boolean = true;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [ PageService ],
      imports: [
        PaginationComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test pagination - page numbers', () => {
    component.amountOfPages.set(3);
    fixture.detectChanges();

    let expected: string[] = [];
    for(let i = 0; i < 3; i++) {
      expected.push((i + 1) + "");
    }

    let linkElements: DebugElement[] = fixture.debugElement.queryAll(By.css('a.page-link'));

    let linktext: string[] = [];
    linkElements.forEach(item => {
      linktext.push( item.nativeElement.innerText );
    });

    expected.forEach(item => {
      let found: number = linktext.indexOf(item);
      expect(found).toBeGreaterThan(-1);
    });
  });

  it('test pagination - previous and next button', () => {
    component.amountOfPages.set(3);
    fixture.detectChanges();

    let linkElements: DebugElement[] = fixture.debugElement.queryAll(By.css('a.page-link'));
    let lastElement: number = linkElements.length - 1;

    expect(linkElements[0].nativeElement.title).toMatch("Previous Page");
    expect(linkElements[lastElement].nativeElement.title).toMatch("Next Page");
  });

  it('test pagination - click 2x at next page and click 2x at previous page', waitForAsync(inject([PageService], (pageService: PageService, done: DoneFn) => {
    let expectationsNext: number[] = [1];
    let expectationsPrevious: number[] = [1];

    pageService.getCurrentPageIndex().subscribe({
      next: (result) => {
        let found: number = 0;

        if(isNext) {
          found = expectationsNext.indexOf(result);
          expect(found).toBeGreaterThan(-1);
          expectationsNext[0] = 2;
        } else {
          found = expectationsPrevious.indexOf(result);   
          expect(found).toBeGreaterThan(-1);   
          expectationsPrevious[0] = 0;
        }        
      },
      complete: () => {
        done();
      }
    });

    component.amountOfPages.set(3);
    fixture.detectChanges();

    let linkElements: DebugElement[] = fixture.debugElement.queryAll(By.css('a.page-link'));
    let lastElement: number = linkElements.length - 1;

    //First click: Next page = lastElement
    linkElements[lastElement].nativeElement.dispatchEvent(new Event('click'));

     //Second click: Next page = lastElement
    linkElements[lastElement].nativeElement.dispatchEvent(new Event('click'));
    
    //First click: Previous page = first element
    isNext = false;    
    linkElements[0].nativeElement.dispatchEvent(new Event('click'));

    //Second click: Previous page = first element
    linkElements[0].nativeElement.dispatchEvent(new Event('click'));
  })));

  it('test pagination - click at pages in order -> 2, 3 and 1', waitForAsync(inject([PageService], (pageService: PageService, done: DoneFn) => {
    let expectPageIndex: number = 1;

    pageService.getCurrentPageIndex().subscribe({
      next: (result) => {
        if(expectPageIndex == 1) {
          expect(result).toBe(expectPageIndex);
          expectPageIndex = 2;
        } else if(expectPageIndex == 2) {
          expect(result).toBe(expectPageIndex);
          expectPageIndex = 0;
        } else if(expectPageIndex == 0) {
          expect(result).toBe(expectPageIndex) ;
        }      
      },
      complete: () => {
        done();
      }
    });

    component.amountOfPages.set(3);
    fixture.detectChanges();

    let linkElements: DebugElement[] = fixture.debugElement.queryAll(By.css('a.page-link'));

    //Click at button with number 2
    linkElements[2].nativeElement.dispatchEvent(new Event('click'));

    //Click at button with number 3
    linkElements[3].nativeElement.dispatchEvent(new Event('click'));

    //Click at button with number 1
    linkElements[1].nativeElement.dispatchEvent(new Event('click'));    
  })));

});