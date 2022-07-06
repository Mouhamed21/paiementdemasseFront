import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportPaiementComponent } from './rapport-paiement.component';

describe('RapportPaiementComponent', () => {
  let component: RapportPaiementComponent;
  let fixture: ComponentFixture<RapportPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
