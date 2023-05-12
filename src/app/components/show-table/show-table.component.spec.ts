import { ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { By } from '@angular/platform-browser';

import { ShowTableComponent } from './show-table.component';
import { PaginationAndPagerDemoModule } from '../pagination-and-pager-demo.module';

import { PersonsService } from 'src/app/services/persons.service';
import { PageService } from 'src/app/services/page.service';

describe('ShowTableComponent', () => {
  let component: ShowTableComponent;
  let fixture: ComponentFixture<ShowTableComponent>;

  let generatePersons: number[] = [
    -1,
    0,
    1,
    2,
    3,
    4,
    5,
    10,
    15,
    20,
    25
  ];

  let recordsPerPage: number[] = [
    5,
    10,
    25,
    50,
    100
  ];

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ShowTableComponent],
      imports: [PaginationAndPagerDemoModule],
      providers: [PersonsService, PageService]
    })
    .compileComponents();

    //Turned off below:
    //fixture = TestBed.createComponent(ShowTableComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ShowTableComponent);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('Check generation of persons in component and persons[] array length', () => {
    for(let i = 0; i < generatePersons.length; i++) {
      fixture = TestBed.createComponent(ShowTableComponent);      
      component = fixture.componentInstance;

      component.generatePersons = generatePersons[i];
      component.ngOnInit();
 
      let currentLength: number = component.getTotalRecords();
  
      expect(component.generatePersons).toBe(currentLength);

      TestBed.resetTestingModule();      
    }
  });

  it('check generation of persons in table - change pagination', fakeAsync(inject([PageService], (pageService: PageService) => {
    fixture = TestBed.createComponent(ShowTableComponent);
    component = fixture.componentInstance;

    component.generatePersons = 100;
    component.ngOnInit();

    fixture.detectChanges();

    for(let i = 0; i < recordsPerPage.length; i++) {
      pageService.setRecordsPerPage(recordsPerPage[i]); 
      component.updatePagination();

      fixture.detectChanges();

      const table: DebugElement[] = fixture.debugElement.queryAll(By.css('table tbody tr'));
      expect(table.length).toEqual(recordsPerPage[i]);
    }
  })));


});