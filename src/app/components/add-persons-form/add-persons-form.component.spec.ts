import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AddPersonsFormComponent } from './add-persons-form.component';
import { FormsModule } from '@angular/forms'
import { PersonsService } from '../../services/persons.service';
import { vi, beforeEach, describe, expect, it } from "Vitest";

describe('AddPersonsFormComponent', () => {
  let component: AddPersonsFormComponent;
  let fixture: ComponentFixture<AddPersonsFormComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AddPersonsFormComponent, FormsModule]
    })
    .compileComponents(); 
    
    fixture = TestBed.createComponent(AddPersonsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    vi.useFakeTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Input Field Test: Input -> input-value', () => { 
    let keypresses: string[] = [' ', 'a', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let testExpectations: number[] = [1, 1, 1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    
    for(let i = 0; i < keypresses.length; i++) {
      const inputField: DebugElement = fixture.debugElement.query(By.css('input'));

      const event = new KeyboardEvent('keypress', {
          key: keypresses[i],
          cancelable: true
      });

      let val: string = "1";

      if(component.numbersOnly(event)) {
        val += keypresses[i];
      }

      inputField.nativeElement.value = val;

      fixture.detectChanges();
      vi.advanceTimersByTime(1000);

      expect(parseInt(inputField.nativeElement.value)).toBe(testExpectations[i]); 
    }       
  });

  // it('Input Field Test: Component -> input-value', () => {
  //   let testNumbers: number[] = [1, 2, 3, 4, 5];
  //   let testExpectations: number[] = [1, 2, 3, 4, 5];

  //   for(let i = 0; i < testNumbers.length; i++) {
  //     component.amountOfPersons = testNumbers[i];    
  //     fixture.detectChanges();
  //     tick();
  
  //     const inputField: DebugElement = fixture.debugElement.query(By.css('input'));
  
  //     expect(parseInt(inputField.nativeElement.value)).toBe(testExpectations[i]); 
  //   }      
  // });

  // it('Input Field Test: Input -> component-value', (async() => {
  //   let keypresses: string[] = [' ', 'a', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  //   let testExpectations: number[] = [1, 1, 1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  //   for (let i = 0; i < keypresses.length; i++) {
  //     const inputField: DebugElement = fixture.debugElement.query(By.css('input'));

  //     const event = new KeyboardEvent('keypress', {
  //       key: keypresses[i],
  //       cancelable: true
  //     });

  //     let val: string = "1";

  //     if (component.numbersOnly(event)) {
  //       val += keypresses[i];
  //     }

  //     inputField.nativeElement.value = val;
  //     inputField.nativeElement.dispatchEvent(new Event('input'));

  //     fixture.detectChanges();
  //     tick();

  //     expect(component.amountOfPersons).toBe(testExpectations[i]);
  //   }
  // });

  it('Test Person Service', inject([PersonsService], (personsService: PersonsService) => {
    let keypresses: string[] = [' ', 'a', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let accumulative: number[] = [1, 2, 3, 13, 24, 36, 49, 63, 78, 94, 111, 129, 148];

    for(let i = 0; i < keypresses.length; i++) {
      const inputField: DebugElement = fixture.debugElement.query(By.css('input'));
      const event = new KeyboardEvent('keypress', {
        key: keypresses[i],
        cancelable: true
      });

      let val: string = "1";

      if (component.numbersOnly(event)) {
        val += keypresses[i];
      }

      inputField.nativeElement.value = val;
      inputField.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      vi.advanceTimersByTime(1000)

      const form: DebugElement = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit', fixture.debugElement.nativeElement);

      fixture.detectChanges();
      vi.advanceTimersByTime(1000);

      expect(personsService.getAllPersons().length).toBe(accumulative[i]); 
    }   
  }));

});