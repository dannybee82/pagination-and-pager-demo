import { TestBed, fakeAsync } from '@angular/core/testing';
import { FilterFunctions } from './FilterFunctions';
import { filter } from 'rxjs';

describe('FilterFunctions Class', () => {

    let filter: FilterFunctions;

    let test001 = [ 
        { id: '1' },
        { id: '2' },
        { id: '11' },
        { id: '3' },
        { id: '111' }
    ];

    let test002 = { id: 'foobar' };

    beforeEach(() => {
        TestBed.configureTestingModule({});  
        filter = new FilterFunctions(); 
    });

    it('FilterFunctions: test001 filter at: 1\'s', fakeAsync(() => {
        let result: any[] = filter.filterObject(test001, '1');
        expect(result.length).toEqual(3);        
    }));

    it('FilterFunctions: test001 filter at: 4\'s', fakeAsync(() => {
        let result: any[] = filter.filterObject(test001, '4');
        expect(result.length).toEqual(0);        
    }));

    it('FilterFunctions: test002 filter at: foobar', fakeAsync(() => {
        let result: any = filter.filterObject([test002], 'foobar');
        expect(result.length).toEqual(1);        
    }));

    it('FilterFunctions: test002 filter at: empty string', fakeAsync(() => {
        let result: any = filter.filterObject([test002], '');
        expect(result.length).toEqual(0);        
    }));

    it('FilterFunctions: filter with: null', fakeAsync(() => {
        let result: any = filter.filterObject(null, 'foobar');
        expect(result).toEqual(undefined);
    }));

});