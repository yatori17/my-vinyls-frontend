import { TestBed } from '@angular/core/testing';

import { VinylService } from './vinyl.service';

describe('Vinyl', () => {
  let service: VinylService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinylService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
