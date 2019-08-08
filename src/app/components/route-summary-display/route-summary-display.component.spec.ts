import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteSummaryDisplayComponent } from './route-summary-display.component';

describe('RouteSummaryDisplayComponent', () => {
  let component: RouteSummaryDisplayComponent;
  let fixture: ComponentFixture<RouteSummaryDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteSummaryDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteSummaryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
