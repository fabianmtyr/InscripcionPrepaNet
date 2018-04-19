import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablegitComponent } from './tablegit.component';

describe('TablegitComponent', () => {
  let component: TablegitComponent;
  let fixture: ComponentFixture<TablegitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablegitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablegitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
