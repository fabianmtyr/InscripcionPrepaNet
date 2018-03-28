import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTutorsComponent } from './view-tutors.component';

describe('ViewTutorsComponent', () => {
  let component: ViewTutorsComponent;
  let fixture: ComponentFixture<ViewTutorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTutorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
