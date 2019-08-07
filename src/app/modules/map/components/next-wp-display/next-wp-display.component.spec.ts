import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextWpDisplayComponent } from './next-wp-display.component';

describe('NextWpDisplayComponent', () => {
  let component: NextWpDisplayComponent;
  let fixture: ComponentFixture<NextWpDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextWpDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextWpDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
