import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'

//Services
import { PersonsService } from 'src/app/services/persons.service';

@Component({
	imports: [
		FormsModule,
		ReactiveFormsModule,
	],
  selector: 'app-add-persons-form',
  templateUrl: './add-persons-form.component.html',
  styleUrls: ['./add-persons-form.component.scss']
})
export class AddPersonsFormComponent implements OnInit {

  form: UntypedFormGroup = new FormGroup({});

	private personsService = inject(PersonsService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: [1, Validators.required]  
    });
  }

  submit() : void {
    if(this.form.valid) {
      let value: number = this.form.get('amount')?.value;

      if(value > 0) {
        this.personsService.generateRandomPersons(value);
        this.personsService.setUpdatePersons(true);
      }     
    }
  }

  numbersOnly(event: KeyboardEvent) : boolean {
    let pattern: RegExp = /^([0-9])$/;
    return pattern.test(event.key);
  }

}