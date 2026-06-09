import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AddPersonsForm } from './add-persons-form';
import { Persons } from '../../services/persons';
import { vi, beforeEach, describe, expect, it } from 'Vitest';

describe('AddPersonsFormComponent', () => {
  let component: AddPersonsForm;
  let fixture: ComponentFixture<AddPersonsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPersonsForm],
      providers: [Persons]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPersonsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
    vi.useFakeTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Input Field Test: Input -> input-value', () => {
    const keypresses: string[] = [' ', 'a', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const testExpectations: number[] = [1, 1, 1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    for (let i = 0; i < keypresses.length; i++) {
      const inputField: DebugElement = fixture.debugElement.query(By.css('input'));

      const event = new KeyboardEvent('keypress', {
        key: keypresses[i],
        cancelable: true
      });

      let val: string = '1';

      if (component.numbersOnly(event)) {
        val += keypresses[i];
      }

      inputField.nativeElement.value = val;
      fixture.detectChanges();
      vi.advanceTimersByTime(1000);

      expect(parseInt(inputField.nativeElement.value)).toBe(testExpectations[i]);
    }
  });

  it('Input Field Test: Component -> input-value', async () => {
    const testNumbers: number[] = [1, 2, 3, 4, 5];
    const testExpectations: number[] = [1, 2, 3, 4, 5];

    for (let i = 0; i < testNumbers.length; i++) {
      // Update the signal form model directly
      component.formModel.set({ amount: testNumbers[i] });
      fixture.detectChanges();
      await fixture.whenStable();

      const inputField: DebugElement = fixture.debugElement.query(By.css('input'));

      expect(parseInt(inputField.nativeElement.value)).toBe(testExpectations[i]);
    }
  });

  it('Input Field Test: Input -> component-value', async () => {
    const keypresses: string[] = [' ', 'a', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const testExpectations: number[] = [1, 1, 1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    for (let i = 0; i < keypresses.length; i++) {
      const inputField: DebugElement = fixture.debugElement.query(By.css('input'));

      const event = new KeyboardEvent('keypress', {
        key: keypresses[i],
        cancelable: true
      });

      let val: string = '1';

      if (component.numbersOnly(event)) {
        val += keypresses[i];
      }

      inputField.nativeElement.value = val;
      inputField.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      await fixture.whenStable();

      // Read value from the signal form instead of a plain property
      expect(component.form().value().amount).toBe(testExpectations[i]);
    }
  });

  it('Test Person Service', inject([Persons], (personsService: Persons) => {
    const keypresses: string[] = [' ', 'a', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const accumulative: number[] = [1, 2, 3, 13, 24, 36, 49, 63, 78, 94, 111, 129, 148];

    for (let i = 0; i < keypresses.length; i++) {
      const inputField: DebugElement = fixture.debugElement.query(By.css('input'));

      const event = new KeyboardEvent('keypress', {
        key: keypresses[i],
        cancelable: true
      });

      let val: string = '1';

      if (component.numbersOnly(event)) {
        val += keypresses[i];
      }

      inputField.nativeElement.value = val;
      inputField.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      vi.advanceTimersByTime(1000);

      const form: DebugElement = fixture.debugElement.query(By.css('form'));  
      form.triggerEventHandler('submit', { preventDefault: () => {} });

      fixture.detectChanges();
      vi.advanceTimersByTime(1000);

      expect(personsService.getAllPersons().length).toBe(accumulative[i]);
    }
  }));
});