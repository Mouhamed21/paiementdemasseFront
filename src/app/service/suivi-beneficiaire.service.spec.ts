import { TestBed } from '@angular/core/testing';

import { SuiviBeneficiaireService } from './suivi-beneficiaire.service';

describe('SuiviBeneficiaireService', () => {
  let service: SuiviBeneficiaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuiviBeneficiaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
