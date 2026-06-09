import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ColumnOption } from '../../models/column-option.interface';
import { DisplayColumns } from '../../services/display-columns';

@Component({
  selector: 'app-toggle-column',
  imports: [],
  templateUrl: './toggle-column.html',
  styleUrl: './toggle-column.scss'
})
export class ToggleColumn implements OnInit {

  protected items: WritableSignal<ColumnOption[]> = signal([]);

  private displayColumnsService = inject(DisplayColumns);

  ngOnInit(): void {
    this.items.set(this.displayColumnsService.columnOptions.getValue());
  }

  toggleItem(columnOption: ColumnOption) : void {
    this.displayColumnsService.toggleColumn(columnOption);
  }

}