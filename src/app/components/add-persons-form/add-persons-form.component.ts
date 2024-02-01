import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'

//Services
import { PersonsService } from 'src/app/services/persons.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
	],
  selector: 'app-add-persons-form',
  templateUrl: './add-persons-form.component.html',
  styleUrls: ['./add-persons-form.component.css']
})
export class AddPersonsFormComponent {

  public amountOfPersons: number = 1;

  constructor(
    private personsService: PersonsService
  ) {}

  submit(form: NgForm) : void {
    if(form.valid) {
      this.personsService.generateRandomPersons(this.amountOfPersons);
      this.personsService.setUpdatePersons(true);
    }
  }

  numbersOnly(event: KeyboardEvent) : boolean {
    let pattern: RegExp = /^([0-9])$/;
    return pattern.test(event.key);
  }

}