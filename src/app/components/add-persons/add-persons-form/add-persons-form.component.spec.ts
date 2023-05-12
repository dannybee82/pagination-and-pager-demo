import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonsFormComponent } from './add-persons-form.component';

describe('AddPersonsFormComponent', () => {
  let component: AddPersonsFormComponent;
  let fixture: ComponentFixture<AddPersonsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPersonsFormComponent]
    });
    fixture = TestBed.createComponent(AddPersonsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
