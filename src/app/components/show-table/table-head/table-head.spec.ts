import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableHead } from './table-head';
import { beforeEach, describe, expect, it } from "Vitest";

describe('TableHeadComponent', () => {
  let component: TableHead;
  let fixture: ComponentFixture<TableHead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableHead]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableHead);
    component = fixture.componentInstance;
    //fixture.detectChanges(); //When working with InputSignal and ModelSignals -> comment this line out.
  });

  it('should create', () => {
    fixture.componentRef.setInput('sortState', {
      sortField: 'firstname',
      isAscending: false
    });

    fixture.componentRef.setInput('sortField', 'firstname');

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});