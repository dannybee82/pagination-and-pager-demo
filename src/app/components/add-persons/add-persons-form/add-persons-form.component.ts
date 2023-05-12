import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'

//Services
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-add-persons-form',
  templateUrl: './add-persons-form.component.html',
  styleUrls: ['./add-persons-form.component.css']
})
export class AddPersonsFormComponent {

  public amountOfPersons: number = 1;

  constructor(private personsService: PersonsService) {}

  submit(form: NgForm) : void {
    if(form.valid) {
      this.personsService.generateRandomPersons(this.amountOfPersons);
      this.personsService.setUpdatePersons(true);
    }
  }

}