import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDisplayComponent } from './position-display.component';

describe('PositionDisplayComponent', () => {
  let component: PositionDisplayComponent;
  let fixture: ComponentFixture<PositionDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
