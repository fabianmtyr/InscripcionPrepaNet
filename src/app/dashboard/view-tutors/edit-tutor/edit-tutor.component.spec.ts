import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTutorComponent } from './edit-tutor.component';

describe('EditTutorComponent', () => {
  let component: EditTutorComponent;
  let fixture: ComponentFixture<EditTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
