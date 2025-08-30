import { TestBed } from '@angular/core/testing';

import { DisplayColumnsService } from './display-columns.service';
import { ColumnOption } from '../models/column-option.interface';

describe('DisplayColumnsService', () => {
  let service: DisplayColumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayColumnsService);
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