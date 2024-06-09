import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	standalone: true,
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output() filterValue: EventEmitter<string> = new EventEmitter<string>();

  public isFiltered: boolean = false;

  filter(value: string): void {
    this.isFiltered = true;
    this.filterValue.emit(value);
  }

  reset() : void {
    this.isFiltered = false;
    this.filterValue.emit('');
  }

}