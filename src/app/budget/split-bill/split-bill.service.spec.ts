import { TestBed } from '@angular/core/testing';

import { SplitBillService } from './split-bill.service';

describe('SplitBillService', () => {
  let service: SplitBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplitBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
