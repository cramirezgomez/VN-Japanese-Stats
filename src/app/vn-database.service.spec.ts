import { TestBed } from '@angular/core/testing';

import { VnDatabaseService } from './vn-database.service';

describe('VnDatabaseService', () => {
  let service: VnDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VnDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
