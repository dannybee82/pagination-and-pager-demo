import { ComponentFixture, TestBed, inject, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PagerComponent } from './pager.component';
import { PageService } from 'src/app/services/page.service';

describe('PagerComponent', () => {
  let component: PagerComponent;
  let fixture: ComponentFixture<PagerComponent>;

  let shouldHaveValues: number [] = [5, 10, 25, 50, 100];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagerComponent ],
      providers: [ PageService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pager dropdown should have values: 5, 10, 25, 50, 100', () => {
    let options: DebugElement[] = fixture.debugElement.queryAll(By.css('select option'));

    for(let i = 0; i < options.length; i++) {
      let found: number = shouldHaveValues.indexOf(parseInt(options[i].nativeElement.value));
      expect(found).toBeGreaterThan(-1);
    }
  });

  it('change dropdown values - should be equal to: productsPerPage', () => {
    let select: DebugElement = fixture.debugElement.query(By.css('select'));

    for(let i = 0; i < shouldHaveValues.length; i++) {
      select.nativeElement.value = shouldHaveValues[i];
      select.nativeElement.dispatchEvent(new Event('change'));

      fixture.detectChanges();

      expect(component.productsPerPage).toBe(shouldHaveValues[i]);
    }
  });

  it('test changePageSize() method and ReplaySubject', waitForAsync(inject([PageService], (pageService: PageService, done: DoneFn) => {
    let index: number = 0;

    pageService.getRecordsPerPage().subscribe({
      next: (result) => {
        let found: number = shouldHaveValues.indexOf(result);
        expect(found).toBeGreaterThan(-1);
        index++;           
      }, 
      complete: () => {
        done(); 
      }   
    });

    for(let i = 0; i < shouldHaveValues.length; i++) {
      component.changePageSize(shouldHaveValues[i] + "");
    }
  })));


});