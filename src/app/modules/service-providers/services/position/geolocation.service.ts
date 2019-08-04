import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetCurrentPositionAction } from '../../../../store/nav.actions';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  lastPos: any;

  constructor(private store: Store<any>) {
    this.getPosition();
  }

  private getPosition() {
    navigator.geolocation.getCurrentPosition(this.setPosition.bind(this)); // todo - set options in config.json
    navigator.geolocation.watchPosition(this.setPosition.bind(this)); // todo - set options in config.json
  }

  mockPos() {
    this.setPosition({
      coords: {
        latitude: this.lastPos.coords.latitude,
        longitude: this.lastPos.coords.longitude + 0.0001,
      }
    });
  }

  setPosition(position) {
    this.lastPos = position;
    this.store.dispatch(new SetCurrentPositionAction({currentPosition: {lat: position.coords.latitude,
                                                                                lon: position.coords.longitude}}));
  }
}
