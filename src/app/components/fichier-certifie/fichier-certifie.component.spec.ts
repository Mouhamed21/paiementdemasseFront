import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichierCertifieComponent } from './fichier-certifie.component';

describe('FichierCertifieComponent', () => {
  let component: FichierCertifieComponent;
  let fixture: ComponentFixture<FichierCertifieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichierCertifieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichierCertifieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
