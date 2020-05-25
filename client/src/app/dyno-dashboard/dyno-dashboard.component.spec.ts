import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynoDashboardComponent } from './dyno-dashboard.component';

describe('DynoDashboardComponent', () => {
  let component: DynoDashboardComponent;
  let fixture: ComponentFixture<DynoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
