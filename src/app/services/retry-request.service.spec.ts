import { TestBed } from '@angular/core/testing';

import { RetryRequestService } from './retry-request.service';

describe('RetryRequestService', () => {
  let service: RetryRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetryRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
