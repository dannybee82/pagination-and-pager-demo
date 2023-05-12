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

  onlyNumbers(input: any) : string {
    if(isNaN(input) || input === "0") {
      return "1";
    }

    if(input !== '' && input != undefined) {
      const reg = /^\d+$/;
      return (input.match(reg)) ? input : "1";
    }

    if(parseInt(input) <= 0) {
      return "1";
    }

    return "1";
  }

}