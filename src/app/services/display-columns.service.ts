import { Injectable } from '@angular/core';
import { ColumnOption } from '../models/column-option.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayColumnsService {

  private _columnOptions: ColumnOption[] = [
    { name: '#', value: 'personNumber', selected: true },
    { name: 'Firstname', value: 'firstName', selected: true },
    { name: 'Lastname', value: 'lastName', selected: true },
    { name: 'Age', value: 'age', selected: true }
  ];

  columnOptions: BehaviorSubject<ColumnOption[]> = new BehaviorSubject<ColumnOption[]>(this._columnOptions);

  displayColumns: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['personNumber', 'firstName', 'lastName', 'age']);

  updateDisplayedColumns(): void {
    const arr: string[] = this.columnOptions.getValue()
      .filter(column => column.selected)
      .map(column => column.value);
      this.displayColumns.next(arr);
  }

  toggleColumn(column: ColumnOption): void {
    column.selected = !column.selected;
    this.updateDisplayedColumns();
  }

}
