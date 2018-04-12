import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FijarPlazasComponent } from './fijar-plazas.component';

describe('FijarPlazasComponent', () => {
  let component: FijarPlazasComponent;
  let fixture: ComponentFixture<FijarPlazasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FijarPlazasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FijarPlazasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
