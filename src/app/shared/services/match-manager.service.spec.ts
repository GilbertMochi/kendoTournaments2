import { TestBed } from '@angular/core/testing';

import { MatchManagerService } from './match-manager.service';

describe('MatchManagerService', () => {
  let service: MatchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
