import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { navActionTypes, PlayVoiceWpNotificationAction, PlayVoiceWpNotificationPayload } from '../../store/nav.actions';
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
      const payload = (playVoiceAction as PlayVoiceWpNotificationAction).payload;
      let instructionText;
      if (payload.isFinalDestination) {
        instructionText = `You have arrived at your destination`;
      } else {
        instructionText = `in ${payload.distanceNotification} meters
        ${stateData.routeDetails.routeLegs[stateData.nextWaypointIndex].maneuverType} to
        ${stateData.routeDetails.routeLegs[stateData.nextWaypointIndex].name}`;
      }
      this.speak(instructionText);
    })
  ).subscribe();


  constructor(private store: Store<any>, private actions$: Actions) {
  }

  ngOnInit() {
  }

  speak(text) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.volume = 100;
    msg.rate = 1.7;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  }

}
