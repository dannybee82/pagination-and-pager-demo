import { Component } from '@angular/core';
import { AddPersonsFormComponent } from './components/add-persons-form/add-persons-form.component';
import { ShowTableComponent } from './components/show-table/show-table.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';

@Component({
	imports: [
		AddPersonsFormComponent,
		ShowTableComponent,
		ScrollToTopComponent,
	],
  	selector: 'app-root',
  	templateUrl: './app.component.html'
})
export class AppComponent {
	title = 'pagination-and-pager-demo';
}