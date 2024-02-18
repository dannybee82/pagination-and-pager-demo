import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollToTopAdminComponent } from './scroll-to-top.component';

describe('ScrollToTopAdminComponent', () => {
  let component: ScrollToTopAdminComponent;
  let fixture: ComponentFixture<ScrollToTopAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ScrollToTopAdminComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollToTopAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
