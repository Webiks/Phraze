import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  lastPos: any;
  positionUpdate$: Subject<any>;

  constructor() {
    this.positionUpdate$ = new BehaviorSubject(undefined);
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
    this.positionUpdate$.next({lat: position.coords.latitude, lon: position.coords.longitude});

    // setTimeout(this.mockPos.bind(this), 2000);
  }
}
