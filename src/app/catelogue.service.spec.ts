import { TestBed } from '@angular/core/testing';

import { CatelogueService } from './catelogue.service';

describe('CatelogueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatelogueService = TestBed.get(CatelogueService);
    expect(service).toBeTruthy();
  });
});
