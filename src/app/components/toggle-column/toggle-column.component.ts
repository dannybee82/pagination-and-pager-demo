import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ColumnOption } from '../../models/column-option.interface';
import { DisplayColumnsService } from '../../services/display-columns.service';

@Component({
  selector: 'app-toggle-column',
  imports: [],
  templateUrl: './toggle-column.component.html',
  styleUrl: './toggle-column.component.scss'
})
export class ToggleColumnComponent implements OnInit {

  protected items: WritableSignal<ColumnOption[]> = signal([]);

  private displayColumnsService = inject(DisplayColumnsService);

  ngOnInit(): void {
    this.items.set(this.displayColumnsService.columnOptions.getValue());
  }

  toggleItem(columnOption: ColumnOption) : void {
    this.displayColumnsService.toggleColumn(columnOption);
  }

}