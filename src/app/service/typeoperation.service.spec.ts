import { TestBed } from '@angular/core/testing';

import { TypeoperationService } from './typeoperation.service';

describe('TypeoperationService', () => {
  let service: TypeoperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeoperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
