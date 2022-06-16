import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeoperationComponent } from './typeoperation.component';

describe('TypeoperationComponent', () => {
  let component: TypeoperationComponent;
  let fixture: ComponentFixture<TypeoperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeoperationComponent ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeoperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
