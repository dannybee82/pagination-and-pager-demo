import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { PaginationAndPagerDemoModule } from './components/pagination-and-pager-demo.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        PaginationAndPagerDemoModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pagination-and-pager-demo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pagination-and-pager-demo');
  });
  
});