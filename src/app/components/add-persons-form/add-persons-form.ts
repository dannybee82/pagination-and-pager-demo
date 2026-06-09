import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Persons } from '../../services/persons';
import { form, min, required, FormField } from '@angular/forms/signals'

@Component({
	imports: [FormField],
  selector: 'app-add-persons-form',
  templateUrl: './add-persons-form.html',
  styleUrls: ['./add-persons-form.scss']
})
export class AddPersonsForm implements OnInit {

  formModel: WritableSignal<{ amount: number }> = signal({ amount: 1 });
  form = form(this.formModel, (form) => {
    required(form.amount, { message: 'The amount field is required' }),
    min(form.amount, 1, { message: 'The amount must have at least have a value of: 1' })
  });

	private personsService = inject(Persons);

  ngOnInit(): void {}

  submit(event: SubmitEvent) : void {
    event.preventDefault();

    if(this.form().valid()) {
      this.personsService.generateRandomPersons(this.form().value().amount);
      this.personsService.setUpdatePersons(true);     
    }
  }

  numbersOnly(event: KeyboardEvent) : boolean {
    let pattern: RegExp = /^([0-9])$/;
    return pattern.test(event.key);
  }

}