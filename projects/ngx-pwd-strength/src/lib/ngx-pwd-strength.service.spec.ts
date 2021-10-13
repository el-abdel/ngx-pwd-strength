import { TestBed } from '@angular/core/testing';

import { NgxPwdStrengthService } from './ngx-pwd-strength.service';

describe('NgxPwdStrengthService', () => {
  let service: NgxPwdStrengthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxPwdStrengthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
