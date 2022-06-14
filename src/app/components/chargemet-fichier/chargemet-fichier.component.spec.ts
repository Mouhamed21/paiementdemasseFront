import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargemetFichierComponent } from './chargemet-fichier.component';

describe('ChargemetFichierComponent', () => {
  let component: ChargemetFichierComponent;
  let fixture: ComponentFixture<ChargemetFichierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargemetFichierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargemetFichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
