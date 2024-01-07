import { TestBed } from '@angular/core/testing';

import { PageService } from '../services/page.service';
import { Pagination } from './Pagination';

import { Person } from '../models/Person';

describe('Pagination Class', () => {
    let service: PageService;
    let pagination: Pagination;

    let testObject001: Person[] = [
        new Person(1, 'firstname 1', 'lastname 1', 18),
        new Person(2, 'firstname 2', 'lastname 1', 19),
        new Person(3, 'firstname 3', 'lastname 1', 20),
        new Person(4, 'firstname 4', 'lastname 1', 21),
        new Person(5, 'firstname 5', 'lastname 1', 22)
    ];

    let testObject002: Person[] = [
        new Person(1, 'firstname', 'lastname', 18),
        new Person(2, 'firstname', 'lastname', 18),
        new Person(3, 'firstname', 'lastname', 18),
        new Person(4, 'firstname', 'lastname', 18),
        new Person(5, 'firstname', 'lastname', 18),
        new Person(6, 'firstname', 'lastname', 18),
        new Person(7, 'firstname', 'lastname', 18),
        new Person(8, 'firstname', 'lastname', 18),
        new Person(9, 'firstname', 'lastname', 18),
        new Person(10, 'firstname', 'lastname', 18),
        new Person(11, 'firstname', 'lastname', 18),
        new Person(12, 'firstname', 'lastname', 18),
        new Person(13, 'firstname', 'lastname', 18),
        new Person(14, 'firstname', 'lastname', 18),
        new Person(15, 'firstname', 'lastname', 18),
        new Person(16, 'firstname', 'lastname', 18),
        new Person(17, 'firstname', 'lastname', 18),
        new Person(18, 'firstname', 'lastname', 18),
        new Person(19, 'firstname', 'lastname', 18),
        new Person(20, 'firstname', 'lastname', 18),
        new Person(21, 'firstname', 'lastname', 18),
        new Person(22, 'firstname', 'lastname', 18),
        new Person(23, 'firstname', 'lastname', 18),
        new Person(24, 'firstname', 'lastname', 18),
        new Person(25, 'firstname', 'lastname', 18)
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({});   
        service = TestBed.inject(PageService);
        pagination = new Pagination(service); 
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
        expect(pagination).toBeTruthy();
    });

    it('test method calculatePages()', () => {
        let recordsPerPage: number[] = [-1, 0, 1, 2, 3, 4, 5]
        let expectations: number[] = [5, 5, 5, 3, 2, 2, 1]

        for(let i = 0; i < recordsPerPage.length; i++) {
            let calculated: number = pagination.calculatePages(testObject001, recordsPerPage[i]);
            expect(calculated).toEqual(expectations[i]);
        }
    });

    it('test method calculateStart()', () => {
        let recordsPerPage: number[] =   [-1, 0, 1, 2, 3, 4, 5]         //-1 becomes 1, 0 becomes 1
        let currentPageIndex: number[] = [-1, 0, 1, 2, 3, 4, 5];        //-1 becomes 0
        let expectations: number[] =     [0, 0, 1, 2, 3, 4, 5,          //results of: -1 x currentPageIndex
                                          0, 0, 1, 2, 3, 4, 5,          //results of: 0 x currentPageIndex
                                          0, 0, 1, 2, 3, 4, 5,          //results of: 1 x currentPageIndex
                                          0, 0, 2, 4, 6, 8, 10,         //results of: 2 x currentPageIndex
                                          0, 0, 3, 6, 9, 12, 15,        //results of: 3 x currentPageIndex
                                          0, 0, 4, 8, 12, 16, 20,       //results of: 4 x currentPageIndex
                                          0, 0, 5, 10, 15, 20, 25];     //results of: 5 x currentPageIndex
        let expectationsIndex: number = 0;

        for(let i = 0; i < recordsPerPage.length; i++) {
            for(let j = 0; j < currentPageIndex.length; j++) {
                let calculated: number = pagination.calculateStart(recordsPerPage[i], currentPageIndex[j]);
                expect(calculated).toEqual(expectations[expectationsIndex]);
                expectationsIndex++;
            }
        }
        
    });

    it('test method calculateEnd()', () => {
        let starts: number[] =           [-1, 0, 1, 2, 3, 4, 5]                 //-1 becomes 0
        let recordsPerPage: number[] =   [-1, 0, 1, 2, 3, 4, 5, 10, 25]         //-1 becomes 1, 0 becomes 1
        let dataLengths: number[] =      [-1, 0, 1, 5, 12, 19, 25, 27, 33];     //-1 becomes 0       
        
        for(let i = 0; i < starts.length; i++) {
            for(let j = 0; j < recordsPerPage.length; j++) {
                for(let k = 0; k < dataLengths.length; k++) {
                    let precalculated: number = 0;

                    let value01: number = (starts[i] <= 0) ? 0 : starts[i];
                    let value02: number = (recordsPerPage[j] <= 0) ? 1 : recordsPerPage[j];
                    let value03: number = (dataLengths[k] <= 0) ? 0 : dataLengths[k];

                    if(value01 + value02 <= value03) {
                        precalculated = value01 + value02;
                    } else {                        
                        precalculated = value01 + (value03 % value02);
                    }                   

                    let calculated: number = pagination.calculateEnd(starts[i], dataLengths[k], recordsPerPage[j]);
                    expect(calculated).toEqual(precalculated);
                }
            }
        }
    });

    it('test method limitRecords() - records length', () => {
        let empty: any = undefined;
        expect(pagination.limitRecords(empty, 1, 0)).toBeUndefined();

        let recordsPerPage: number[] = [-1, 0, 1, 2, 3, 4, 5, 10, 25]         //-1 becomes 1, 0 becomes 1
        //let currentPageIndexes: number[] = [-1, 0, 1, 2, 3, 4, 5]            //-1 becomes 0
        let expectations: number[] =   [1, 1, 1, 2, 3, 4, 5, 10, 25];
        //let expectationsIndex: number = 0;

        for(let i = 0; i < recordsPerPage.length; i++) {
            let obj: any = pagination.limitRecords(testObject002, recordsPerPage[i], 0);
            expect(obj.length).toEqual(expectations[i] );
        }
        //testObject002
    });

    it('test method limitRecords() - records from ... to ', () => {
        let recordsPerPage: number[] =      [-1, 0, 1, 2, 3, 4, 5, 10, 25]      //recordsPerPage   =>  -1 becomes 1, 0 becomes 1
        let currentPageIndexes: number[] =  [ 0, 0, 1, 2, 3, 4]                 //currentPageIndexes  =>  -1 becomes 0
        //Test with currentPageIndex set.
        for(let i = 0; i < recordsPerPage.length; i++) {
            for(let j = 0; j < currentPageIndexes.length; j++) {
                let objTest: Person[] = pagination.limitRecords(testObject002, recordsPerPage[i], currentPageIndexes[j]);
                let lastElement: number = objTest.length - 1;

                let firstElementValue: number = pagination.calculateStart(recordsPerPage[i], currentPageIndexes[j]);
                let secondElementValue: number = pagination.calculateEnd(firstElementValue, testObject002.length, recordsPerPage[i]);

                firstElementValue += 1;

                if(lastElement < objTest.length && objTest[0] !== undefined && objTest[lastElement] !== undefined) {
                    expect(objTest[0].personNumber).toEqual(firstElementValue);
                    expect(objTest[lastElement].personNumber).toEqual(secondElementValue);
                } else {
                    //At this point the start and end are out of range.
                    expect(firstElementValue).toBeGreaterThan(testObject002.length);
                }
            }
        }
    });


    it('test method: getCurrentShowing()', () => {
        pagination.setData(testObject002);
        //Test default: 10 records per page.
        expect(pagination.getCurrentShowing()).toMatch("1 - 10");

        //Change page.
        let pageSize10Indexes: number[] = [1, 2];
        let pageSize10Expectations: string[] = ["11 - 20", "21 - 25"];

        for(let i = 0; i < pageSize10Indexes.length; i++) {
            service.setCurrentPageIndex(pageSize10Indexes[i]);
            expect(pagination.getCurrentShowing()).toMatch(pageSize10Expectations[i]);
        }

        //Change page size.
        service.setRecordsPerPage(5);

        let pageSize5Indexes: number[] = [0, 1, 2, 3, 4];
        let pageSize5Expectations: string[] = ["1 - 5", "6 - 10", "11 - 15", "16 - 20", "21 - 25" ];

        for(let i = 0; i < pageSize5Indexes.length; i++) {
            service.setCurrentPageIndex(pageSize5Indexes[i]);
            expect(pagination.getCurrentShowing()).toContain(pageSize5Expectations[i]);
        }

        //Change page size.
        service.setRecordsPerPage(25);

        let pageSize25Indexes: number[] = [0];
        let pageSize25Expectations: string[] = ["1 - 25"];

        for(let i = 0; i < pageSize25Indexes.length; i++) {
            service.setCurrentPageIndex(pageSize25Indexes[i]);
            expect(pagination.getCurrentShowing()).toContain(pageSize25Expectations[i]);
        }

        //Change page size. Odd number
        service.setRecordsPerPage(7);

        let pageSize7Indexes: number[] = [0, 1, 2, 3];
        let pageSize7Expectations: string[] = ["1 - 7", "8 - 14", "15 - 21", "22 - 25"];

        for(let i = 0; i < pageSize7Indexes.length; i++) {
            service.setCurrentPageIndex(pageSize7Indexes[i]);
            expect(pagination.getCurrentShowing()).toContain(pageSize7Expectations[i]);
        }
    });


});