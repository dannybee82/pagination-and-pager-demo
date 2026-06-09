import { Component } from '@angular/core';
import { AddPersonsForm } from './components/add-persons-form/add-persons-form';
import { ShowTable } from './components/show-table/show-table';
import { ScrollToTop } from './components/scroll-to-top/scroll-to-top';

@Component({
	imports: [
		AddPersonsForm,
		ShowTable,
		ScrollToTop,
	],
  	selector: 'app-root',
  	templateUrl: './app.html'
})
export class App {
	title = 'pagination-and-pager-demo';
}