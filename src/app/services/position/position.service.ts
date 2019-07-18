import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  lastPos: any;
  positionUpdate$: Subject<any>;

  constructor() {
    this.positionUpdate$ = new Subject();
    this.getPosition();
  }

  private getPosition() { // TODO track position
    navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
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
