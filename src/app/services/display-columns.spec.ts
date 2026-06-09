import { TestBed } from '@angular/core/testing';
import { DisplayColumns } from './display-columns';
import { ColumnOption } from '../models/column-option.interface';
import { beforeEach, describe, expect, it } from "Vitest";

describe('DisplayColumnsService', () => {
  let service: DisplayColumns;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayColumns);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('test updateDisplayedColumns()', () => {
    service.updateDisplayedColumns();

    const defaultValues: ColumnOption[] = service.columnOptions.getValue();
    expect(defaultValues).toEqual([
      { name: '#', value: 'personNumber', selected: true },
      { name: 'Firstname', value: 'firstName', selected: true },
      { name: 'Lastname', value: 'lastName', selected: true },
      { name: 'Age', value: 'age', selected: true }
    ]);

    //toggle off firstName
    service.columnOptions.next([
      { name: '#', value: 'personNumber', selected: true },
      { name: 'Firstname', value: 'firstName', selected: false },
      { name: 'Lastname', value: 'lastName', selected: true },
      { name: 'Age', value: 'age', selected: true }
    ]);

    const changedValues: ColumnOption[] = service.columnOptions.getValue();

     expect(changedValues).toEqual([
      { name: '#', value: 'personNumber', selected: true },
      { name: 'Firstname', value: 'firstName', selected: false },
      { name: 'Lastname', value: 'lastName', selected: true },
      { name: 'Age', value: 'age', selected: true }
    ]);
  });

});