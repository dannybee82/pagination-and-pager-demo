import { TestBed } from '@angular/core/testing';
import { Person } from '../models/person.interface';
import { SortFunctions } from './SortFunctions';

describe('SortFunctions Class', () => {

    let persons: Person[] = [
        { personNumber: 1, firstName: 'Saskia', lastName: 'des Esseintes', age: 21 },
        { personNumber: 2, firstName: 'Matilda', lastName: 'du Mal', age: 27 },
        { personNumber: 3, firstName: 'Juliette', lastName: 'Wolpertinger', age: 25 },
        { personNumber: 4, firstName: 'Vicoria', lastName: 'Mer', age: 23 },
        { personNumber: 5, firstName: 'Abigaïl', lastName: 'Languedoc', age: 23 }
    ];

    let defaultPersons: Person[] = [
        { personNumber: 1, firstName: 'Saskia', lastName: 'des Esseintes', age: 21 },
        { personNumber: 2, firstName: 'Matilda', lastName: 'du Mal', age: 27 },
        { personNumber: 3, firstName: 'Juliette', lastName: 'Wolpertinger', age: 25 },
        { personNumber: 4, firstName: 'Vicoria', lastName: 'Mer', age: 23 },
        { personNumber: 5, firstName: 'Abigaïl', lastName: 'Languedoc', age: 23 }
    ];

    const expectedTest001: Person[] = [
        { personNumber: 5, firstName: 'Abigaïl', lastName: 'Languedoc', age: 23 },
        { personNumber: 3, firstName: 'Juliette', lastName: 'Wolpertinger', age: 25 },
        { personNumber: 2, firstName: 'Matilda', lastName: 'du Mal', age: 27 },
        { personNumber: 1, firstName: 'Saskia', lastName: 'des Esseintes', age: 21 },
        { personNumber: 4, firstName: 'Vicoria', lastName: 'Mer', age: 23 }
    ];

    const expectedTest002: Person[] = [
        { personNumber: 4, firstName: 'Vicoria', lastName: 'Mer', age: 23 },
        { personNumber: 1, firstName: 'Saskia', lastName: 'des Esseintes', age: 21 },
        { personNumber: 2, firstName: 'Matilda', lastName: 'du Mal', age: 27 },
        { personNumber: 3, firstName: 'Juliette', lastName: 'Wolpertinger', age: 25 },
        { personNumber: 5, firstName: 'Abigaïl', lastName: 'Languedoc', age: 23 }
    ];

    const expectedTest003: Person[] = [
        { personNumber: 1, firstName: 'Saskia', lastName: 'des Esseintes', age: 21 },
        { personNumber: 2, firstName: 'Matilda', lastName: 'du Mal', age: 27 },
        { personNumber: 5, firstName: 'Abigaïl', lastName: 'Languedoc', age: 23 },
        { personNumber: 4, firstName: 'Vicoria', lastName: 'Mer', age: 23 },
        { personNumber: 3, firstName: 'Juliette', lastName: 'Wolpertinger', age: 25 }
    ];

    const expectedTest004: Person[] = [
        { personNumber: 3, firstName: 'Juliette', lastName: 'Wolpertinger', age: 25 },
        { personNumber: 4, firstName: 'Vicoria', lastName: 'Mer', age: 23 },
        { personNumber: 5, firstName: 'Abigaïl', lastName: 'Languedoc', age: 23 },
        { personNumber: 2, firstName: 'Matilda', lastName: 'du Mal', age: 27 },
        { personNumber: 1, firstName: 'Saskia', lastName: 'des Esseintes', age: 21 }
    ];

    const expectedTest005: Person[] = [
        { personNumber: 1, firstName: 'Saskia', lastName: 'des Esseintes', age: 21 },        
        { personNumber: 4, firstName: 'Vicoria', lastName: 'Mer', age: 23 },
        { personNumber: 5, firstName: 'Abigaïl', lastName: 'Languedoc', age: 23 },        
        { personNumber: 3, firstName: 'Juliette', lastName: 'Wolpertinger', age: 25 },
        { personNumber: 2, firstName: 'Matilda', lastName: 'du Mal', age: 27 }        
    ];

    const expectedTest006: Person[] = [
        { personNumber: 2, firstName: 'Matilda', lastName: 'du Mal', age: 27 },
        { personNumber: 3, firstName: 'Juliette', lastName: 'Wolpertinger', age: 25 },
        { personNumber: 5, firstName: 'Abigaïl', lastName: 'Languedoc', age: 23 },    
        { personNumber: 4, firstName: 'Vicoria', lastName: 'Mer', age: 23 },        
        { personNumber: 1, firstName: 'Saskia', lastName: 'des Esseintes', age: 21 }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({});
        persons = defaultPersons;
    });

    it('class not null', () => {
        let sortFunctions = new SortFunctions();
        expect(sortFunctions).toBeTruthy();
    });

    it('sort persons by firstName + ascending', () => {
        let _sortFunctions = new SortFunctions();
        _sortFunctions.sort(persons, 'firstName', true);
        
        expect(expectedTest001.length).toBe(persons.length);

        if(expectedTest001.length === persons.length) {
            for(let i = 0; i < expectedTest001.length; i++) {
                expect(expectedTest001[i].personNumber).toEqual(persons[i].personNumber);
                expect(expectedTest001[i].firstName).toEqual(persons[i].firstName);
                expect(expectedTest001[i].lastName).toEqual(persons[i].lastName);
                expect(expectedTest001[i].age).toEqual(persons[i].age);
            }
        }
    });

    it('sort persons by firstName + descending', () => {
        let _sortFunctions = new SortFunctions();
        _sortFunctions.sort(persons, 'firstName', false);
        
        expect(expectedTest002.length).toBe(persons.length);

        if(expectedTest002.length === persons.length) {
            for(let i = 0; i < expectedTest002.length; i++) {
                expect(expectedTest002[i].personNumber).toEqual(persons[i].personNumber);
                expect(expectedTest002[i].firstName).toEqual(persons[i].firstName);
                expect(expectedTest002[i].lastName).toEqual(persons[i].lastName);
                expect(expectedTest002[i].age).toEqual(persons[i].age);
            }
        }
    });

    it('sort persons by lastName + ascending', () => {
        let _sortFunctions = new SortFunctions();
        _sortFunctions.sort(persons, 'lastName', true);
        
        expect(expectedTest003.length).toBe(persons.length);

        if(expectedTest003.length === persons.length) {
            for(let i = 0; i < expectedTest003.length; i++) {
                expect(expectedTest003[i].personNumber).toEqual(persons[i].personNumber);
                expect(expectedTest003[i].firstName).toEqual(persons[i].firstName);
                expect(expectedTest003[i].lastName).toEqual(persons[i].lastName);
                expect(expectedTest003[i].age).toEqual(persons[i].age);
            }
        }
    });

    it('sort persons by lastName + descending', () => {
        let _sortFunctions = new SortFunctions();
        _sortFunctions.sort(persons, 'lastName', false);
        
        expect(expectedTest004.length).toBe(persons.length);

        if(expectedTest004.length === persons.length) {
            for(let i = 0; i < expectedTest004.length; i++) {
                expect(expectedTest004[i].personNumber).toEqual(persons[i].personNumber);
                expect(expectedTest004[i].firstName).toEqual(persons[i].firstName);
                expect(expectedTest004[i].lastName).toEqual(persons[i].lastName);
                expect(expectedTest004[i].age).toEqual(persons[i].age);
            }
        }
    });

    it('sort persons by age + ascending', () => {
        let _sortFunctions = new SortFunctions();
        _sortFunctions.sort(persons, 'age', true);
        
        expect(expectedTest005.length).toBe(persons.length);

        if(expectedTest005.length === persons.length) {
            for(let i = 0; i < expectedTest005.length; i++) {
                expect(expectedTest005[i].personNumber).toEqual(persons[i].personNumber);
                expect(expectedTest005[i].firstName).toEqual(persons[i].firstName);
                expect(expectedTest005[i].lastName).toEqual(persons[i].lastName);
                expect(expectedTest005[i].age).toEqual(persons[i].age);
            }
        }
    });

    it('sort persons by age + descending', () => {
        let _sortFunctions = new SortFunctions();
        _sortFunctions.sort(persons, 'age', false);
        
        expect(expectedTest006.length).toBe(persons.length);

        if(expectedTest006.length === persons.length) {
            for(let i = 0; i < expectedTest006.length; i++) {
                expect(expectedTest006[i].personNumber).toEqual(persons[i].personNumber);
                expect(expectedTest006[i].firstName).toEqual(persons[i].firstName);
                expect(expectedTest006[i].lastName).toEqual(persons[i].lastName);
                expect(expectedTest006[i].age).toEqual(persons[i].age);
            }
        }
    });


});