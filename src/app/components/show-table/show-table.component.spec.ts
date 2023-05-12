import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTableComponent } from './show-table.component';
import { PaginationAndPagerDemoModule } from '../pagination-and-pager-demo.module';

describe('ShowTableComponent', () => {
  let component: ShowTableComponent;
  let fixture: ComponentFixture<ShowTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTableComponent],
      imports: [PaginationAndPagerDemoModule]
    });
    fixture = TestBed.createComponent(ShowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
