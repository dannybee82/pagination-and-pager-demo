import { Component, input, InputSignal, model, ModelSignal, output, OutputEmitterRef } from '@angular/core';
import { SortState } from '../../../models/sort-state.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'th[app-table-head]',
  imports: [TitleCasePipe],
  templateUrl: './table-head.component.html',
  styleUrl: './table-head.component.scss'
})
export class TableHeadComponent {

  sortState: ModelSignal<SortState | undefined> = model();
  sortField: InputSignal<string> = input.required();

  sortAction: OutputEmitterRef<SortState> = output();

  callback(sortField: string, isAscending: boolean): void {
    const state: SortState = {
      sortField: sortField,
      isAscending: isAscending
    };

    this.sortAction.emit(state);
  }

}
