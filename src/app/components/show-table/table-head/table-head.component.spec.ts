import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeadComponent } from './table-head.component';

describe('TableHeadComponent', () => {
  let component: TableHeadComponent;
  let fixture: ComponentFixture<TableHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableHeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableHeadComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges(); //When working with InputSignal and ModelSignals -> comment this line out.
  });

  it('should create', () => {
    fixture.componentRef.setInput('sortState', {
      sortField: 'firstname',
      isAscending: false
    });

    fixture.componentRef.setInput('sortField', 'firstname');

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});