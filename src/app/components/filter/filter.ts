import { Component, OutputEmitterRef, WritableSignal, output, signal } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.html',
  styleUrls: ['./filter.scss']
})
export class Filter {
  filterValue: OutputEmitterRef<string> = output<string>();

  public isFiltered: WritableSignal<boolean> = signal(false);

  filter(value: string): void {
    this.isFiltered.set(true);
    this.filterValue.emit(value);
  }

  reset() : void {
    this.isFiltered.set(false);
    this.filterValue.emit('');
  }

}