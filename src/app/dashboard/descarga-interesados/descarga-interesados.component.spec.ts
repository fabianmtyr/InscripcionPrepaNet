import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargaInteresadosComponent } from './descarga-interesados.component';

describe('DescargaInteresadosComponent', () => {
  let component: DescargaInteresadosComponent;
  let fixture: ComponentFixture<DescargaInteresadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescargaInteresadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargaInteresadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
