import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPaiementsComponent } from './gestion-paiements.component';

describe('GestionPaiementsComponent', () => {
  let component: GestionPaiementsComponent;
  let fixture: ComponentFixture<GestionPaiementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPaiementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPaiementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
