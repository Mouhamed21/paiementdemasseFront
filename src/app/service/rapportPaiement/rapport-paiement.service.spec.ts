import { TestBed } from '@angular/core/testing';

import { RapportPaiementService } from './rapport-paiement.service';

describe('RapportPaiementService', () => {
  let service: RapportPaiementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapportPaiementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
