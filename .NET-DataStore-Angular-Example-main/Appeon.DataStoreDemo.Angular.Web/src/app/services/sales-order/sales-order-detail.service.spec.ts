import { TestBed } from '@angular/core/testing';

import { SalesOrderDetailService } from './sales-order-detail.service';

describe('SalesOrderDetailService', () => {
  let service: SalesOrderDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesOrderDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
