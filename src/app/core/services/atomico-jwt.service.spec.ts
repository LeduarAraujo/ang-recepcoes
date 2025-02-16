import { TestBed } from '@angular/core/testing';

import { AtomicoJwtService } from './atomico-jwt.service';

describe('AtomicoJwtService', () => {
  let service: AtomicoJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtomicoJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
