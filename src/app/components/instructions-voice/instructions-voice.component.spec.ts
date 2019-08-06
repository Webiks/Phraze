import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsVoiceComponent } from './instructions-voice.component';

describe('InstructionsVoiceComponent', () => {
  let component: InstructionsVoiceComponent;
  let fixture: ComponentFixture<InstructionsVoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionsVoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
