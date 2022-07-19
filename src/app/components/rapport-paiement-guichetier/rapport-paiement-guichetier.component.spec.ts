import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportPaiementGuichetierComponent } from './rapport-paiement-guichetier.component';

describe('RapportPaiementGuichetierComponent', () => {
  let component: RapportPaiementGuichetierComponent;
  let fixture: ComponentFixture<RapportPaiementGuichetierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportPaiementGuichetierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportPaiementGuichetierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
