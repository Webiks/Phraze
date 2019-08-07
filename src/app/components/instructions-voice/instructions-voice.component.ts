import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { navActionTypes } from '../../store/nav.actions';
import { tap, withLatestFrom } from 'rxjs/operators';
import { getNavState } from '../../store/nav.selectors';

@Component({
  selector: 'app-instructions-voice',
  templateUrl: './instructions-voice.component.html',
  styleUrls: ['./instructions-voice.component.scss']
})
export class InstructionsVoiceComponent implements OnInit {
  @Effect({ dispatch: false })
  playVoiceInstruction$ = this.actions$.pipe(
    ofType(navActionTypes.PLAY_VOICE_WP_NOTIFICATION),
    withLatestFrom(this.store.pipe(select(getNavState))),
    tap(([playVoiceAction, stateData]) => {
      console.log(Math.round(stateData.nextWaypointDistance));
      const texter = `in ${Math.round(stateData.nextWaypointDistance)} meters
       ${stateData.routeDetails.routeLegs[stateData.nextWaypointIndex].maneuverType} to  
      ${stateData.routeDetails.routeLegs[stateData.nextWaypointIndex].name}`;
      console.log(texter);
      this.speak(texter);
    })
  ).subscribe();


  constructor(private store: Store<any>, private actions$: Actions) {
  }

  ngOnInit() {
  }

  speak(text) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.volume = 70;

    window.speechSynthesis.speak(msg);
  }

}
