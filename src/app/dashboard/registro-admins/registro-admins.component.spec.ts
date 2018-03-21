import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAdminsComponent } from './registro-admins.component';

describe('RegistroAdminsComponent', () => {
  let component: RegistroAdminsComponent;
  let fixture: ComponentFixture<RegistroAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
