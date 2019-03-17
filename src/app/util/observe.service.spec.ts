import { TestBed } from '@angular/core/testing';

import { ObserveService } from './observe.service';

describe('ObserveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObserveService = TestBed.get(ObserveService);
    expect(service).toBeTruthy();
  });
});
