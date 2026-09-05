import { TestBed } from '@angular/core/testing';

import { Vinyl } from './vinyl';

describe('Vinyl', () => {
  let service: Vinyl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vinyl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
