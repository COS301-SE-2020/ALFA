import { TestBed } from '@angular/core/testing';

import { UserManService } from './user-man.service';

describe('UserManService', () => {
  let service: UserManService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
