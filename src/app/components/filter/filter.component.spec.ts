import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { vi, beforeEach, describe, expect, it } from "Vitest";

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [FilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    vi.useFakeTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Input Field Test: of Filter: Input -> input-value', () => {
    let keypresses: string[] = ['f', 'o', 'o', ' ', 'b', 'a', 'r'];
    let testExpectations: string[] = ['f', 'fo', 'foo' , 'foo ', 'foo b', 'foo ba', 'foo bar'];
    
    let val: string = "";

    for(let i = 0; i < keypresses.length; i++) {
      const inputField: DebugElement = fixture.debugElement.query(By.css('input'));

      const event = new KeyboardEvent('keypress', {
        key: keypresses[i],
        cancelable: true
      });

      val += keypresses[i];

      inputField.nativeElement.value = val;

      fixture.detectChanges();
      vi.advanceTimersByTime(1000);

      expect(inputField.nativeElement.value).toEqual(testExpectations[i]);
    }
  });

  it('Filter-Component: Test filter button', () => {
    const component = fixture.componentInstance; 
    vi.spyOn(component.filterValue, 'emit');
    
    let value: string = 'foobar';
    const inputField: DebugElement = fixture.debugElement.query(By.css('input'));
    inputField.nativeElement.value = value;

    fixture.detectChanges();
    vi.advanceTimersByTime(1000);

    const button: DebugElement = fixture.debugElement.query(By.css('button.btn-primary'));
    (button.nativeElement as HTMLButtonElement).click();

    fixture.detectChanges();
    vi.advanceTimersByTime(1000);

    fixture.detectChanges();
    expect(component.filterValue.emit).toHaveBeenCalledWith('foobar');
  });

  it('Filter-Component: Test reset button', () => {
    const component = fixture.componentInstance;
    vi.spyOn(component.filterValue, 'emit');
    //Make reset button visible
    component.isFiltered.set(true);

    let value: string = 'foobar';
    const inputField: DebugElement = fixture.debugElement.query(By.css('input'));
    inputField.nativeElement.value = value;

    fixture.detectChanges();
    vi.advanceTimersByTime(1000);

    expect(inputField.nativeElement.value).toEqual('foobar');

    const button: DebugElement = fixture.debugElement.query(By.css('button.btn-error'));
    (button.nativeElement as HTMLButtonElement).click();

    fixture.detectChanges();
    vi.advanceTimersByTime(1000);

    expect(inputField.nativeElement.value).toEqual('');
    expect(component.filterValue.emit).toHaveBeenCalledWith('');
  })

  it('Filter-component: Test boolean value: isFiltered', () => {
    const component = fixture.componentInstance;

    let value: string = 'foobar';
    const inputField: DebugElement = fixture.debugElement.query(By.css('input'));
    inputField.nativeElement.value = value;

    fixture.detectChanges();
    vi.advanceTimersByTime(1000);

    const buttonFilter: DebugElement = fixture.debugElement.query(By.css('button.btn-primary'));
    (buttonFilter.nativeElement as HTMLButtonElement).click();

    fixture.detectChanges();
    vi.advanceTimersByTime(1000);

    expect(component.isFiltered()).toBe(true);

    const buttonReset: DebugElement = fixture.debugElement.query(By.css('button.btn-error'));
    (buttonReset.nativeElement as HTMLButtonElement).click();

    fixture.detectChanges();
    vi.advanceTimersByTime(1000);

    expect(component.isFiltered()).toBe(false);
  });


});