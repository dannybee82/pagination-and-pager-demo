import { Component } from '@angular/core';
import { AddPersonsFormComponent } from 'src/app/components/add-persons-form/add-persons-form.component';
import { ShowTableComponent } from 'src/app/components/show-table/show-table.component';
import { ScrollToTopAdminComponent } from 'src/app/components/scroll-to-top/scroll-to-top.component';

@Component({
	standalone: true,
	imports: [
		AddPersonsFormComponent,
		ShowTableComponent,
		ScrollToTopAdminComponent,
	],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pagination-and-pager-demo';
}