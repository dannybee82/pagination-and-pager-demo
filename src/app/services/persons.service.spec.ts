import { TestBed } from '@angular/core/testing';
import { PersonsService } from './persons.service';

describe('PersonsService', () => {
  let service: PersonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test generation of persons', () => {
    let generateAmounts: number[] = [-1, 0, 1, 2, 3,  4,  5, 10, 25,  50, 100];
    let totalAmounts: number[] =    [0,  0, 1, 3, 6, 10, 15, 25, 50, 100, 200];

    for(let i = 0; i < generateAmounts.length; i++) {
      service.generateRandomPersons(generateAmounts[i]);

      expect(totalAmounts[i]).toEqual(service.getAllPersons().length);
    }
  });

  it('test update persons - Replaysubject', () => {    
    let currentIndex: number = 0;
    let testValues: boolean[] = [true, false];

    service.getUpdatePersons().subscribe({
      next: (result) => {        
        if(currentIndex == 0) {
          expect(result).toBeTruthy();
          currentIndex++;
        } else {
          expect(result).toBeFalsy();
        }
      },
      complete: () => {
        setTimeout(() => {}, 500);
      }
    });

    for(let i = 0; i < testValues.length; i++) {
      service.setUpdatePersons(testValues[i]);
    }
  });

});