import { TestBed } from '@angular/core/testing';

import { ChargefichierService } from './chargefichier.service';

describe('ChargefichierService', () => {
  let service: ChargefichierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargefichierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
