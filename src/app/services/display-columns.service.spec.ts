import { TestBed } from '@angular/core/testing';

import { DisplayColumnsService } from './display-columns.service';

describe('DisplayColumnsService', () => {
  let service: DisplayColumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayColumnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
