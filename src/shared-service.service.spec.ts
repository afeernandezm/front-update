import { TestBed } from '@angular/core/testing';

import { SharedService } from './app/services/shared.service';

describe('SharedServiceService', () => {
  let service: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
