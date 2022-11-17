import { TestBed } from '@angular/core/testing';

import { LoggerHttpService } from './logger-http.service';

describe('LoggerHttpService', () => {
  let service: LoggerHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
