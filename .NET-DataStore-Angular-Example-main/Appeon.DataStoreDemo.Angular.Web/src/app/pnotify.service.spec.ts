import { TestBed } from '@angular/core/testing';

import { PNotifyService } from './pnotify.service';

describe('PNotifyService', () => {
  let service: PNotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PNotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
