import { TestBed } from '@angular/core/testing';

import { UserSharedService } from './user-shared.service';

describe('UserSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSharedService = TestBed.get(UserSharedService);
    expect(service).toBeTruthy();
  });
});
