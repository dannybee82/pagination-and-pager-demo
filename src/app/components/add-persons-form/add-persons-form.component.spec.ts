import { ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddPersonsFormComponent } from './add-persons-form.component';
import { PaginationAndPagerDemoModule } from '../pagination-and-pager-demo.module';
import { FormsModule } from '@angular/forms'

import { PersonsService } from 'src/app/services/persons.service';

describe('AddPersonsFormComponent', () => {
  let component: AddPersonsFormComponent;
  let fixture: ComponentFixture<AddPersonsFormComponent>;

  let inputs: any[] = [
    '',
    '0',
    'a',
    '!',
    '-1',
    '5',
    '10',
    '15',
    '25'
  ];

  let expectations: number[] = [
    1,
    1,
    1,
    1,
    1,
    5,
    10,
    15,
    25
  ];

  let accumulative: number[] = [
    1,
    2,
    3,
    4,
    5,
    10,
    20,
    35,
    60
  ];

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [AddPersonsFormComponent],
      imports: [PaginationAndPagerDemoModule, FormsModule]
    })
    .compileComponents(); 
    
    fixture = TestBed.createComponent(AddPersonsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Input Field Test: Input -> input-value', fakeAsync(() => {    
    for(let i = 0; i < inputs.length; i++) {
      const inputField: DebugElement = fixture.debugElement.query(By.css('input'));
      inputField.nativeElement.value = inputs[i];
      inputField.nativeElement.dispatchEvent(new Event('keyup'));

      fixture.detectChanges();
      tick();

      expect(parseInt(inputField.nativeElement.value)).toBe(expectations[i]); 
    }
       
  }));

  it('Input Field Test: Component -> input-value', fakeAsync(() => {
    for(let i = 4; i < expectations.length; i++) {
      component.amountOfPersons = expectations[i];    
      fixture.detectChanges();
      tick();
  
      const inputField: DebugElement = fixture.debugElement.query(By.css('input'));
  
      expect(parseInt(inputField.nativeElement.value)).toBe(expectations[i]); 
    }      
  }));

  it('Input Field Test: Input -> component-value', fakeAsync(async() => {
    for(let i = 0; i < inputs.length; i++) {
      const inputField: DebugElement = fixture.debugElement.query(By.css('input'));
      inputField.nativeElement.value = inputs[i];
      inputField.nativeElement.dispatchEvent(new Event('keyup'));
      fixture.detectChanges();
      tick();
      
      inputField.nativeElement.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      tick();

      expect(component.amountOfPersons).toBe(expectations[i]);
    }
  }));

  it('Test Person Service', fakeAsync(inject([PersonsService], (personsService: PersonsService) => {
    for(let i = 0; i < inputs.length; i++) {
      const inputField: DebugElement = fixture.debugElement.query(By.css('input'));
      inputField.nativeElement.value = inputs[i];
      inputField.nativeElement.dispatchEvent(new Event('keyup'));

      fixture.detectChanges();
      tick();

      inputField.nativeElement.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      tick();

      const form: DebugElement = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit', fixture.debugElement.nativeElement);

      fixture.detectChanges();
      tick();

      expect(personsService.getAllPersons().length).toBe(accumulative[i]); 
    }   
  })));

});
