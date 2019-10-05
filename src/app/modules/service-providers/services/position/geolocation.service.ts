import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetCurrentPositionAction } from '../../../../store/nav.actions';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private store: Store<any>) {
    this.getPosition();
  }

  private getPosition() {
    navigator.geolocation.getCurrentPosition(this.setPosition.bind(this)); // todo - set options in config.json
    navigator.geolocation.watchPosition(this.setPosition.bind(this)); // todo - set options in config.json
  }

  setPosition(position) {
    this.store.dispatch(new SetCurrentPositionAction({currentPosition: {latitude: position.coords.latitude,
                                                                                longitude: position.coords.longitude},
                                                              heading: position.coords.heading}));
  }
}
