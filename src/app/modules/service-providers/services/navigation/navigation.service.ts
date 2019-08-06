import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { lineSlice, lineString, nearestPointOnLine, point, length } from '@turf/turf';
import {
  currentPositionSelector,
  nextWaypointIndexSelector,
  routeDetailsSelector,
  routePointsSelector
} from '../../../../store/nav.selectors';
import { filter, tap, withLatestFrom } from 'rxjs/operators';
import { SetDistanceToEndpointAction, SetNextWaypointDistanceAction, SetNextWaypointIndexAction } from '../../../../store/nav.actions';


@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private store: Store<any>) {
    this.calcNextWaypoints();
  }


  calcNextWaypoints() {
    this.store.pipe(
      select(currentPositionSelector),
      withLatestFrom(this.store.pipe(select(routePointsSelector))),
      filter(([currentPosition, routePoints]) => currentPosition.latitude !== null && routePoints !== null),
      withLatestFrom(this.store.pipe(select(nextWaypointIndexSelector)), this.store.pipe(select(routeDetailsSelector))),
      tap(([[currentPosition, routePoints], nextWpIndex, routeDetails]) => {
        const currentPositionOnRoute = nearestPointOnLine(lineString(routePoints), point([currentPosition.latitude,
          currentPosition.longitude
        ]));
        this.store.dispatch(new SetDistanceToEndpointAction({
          distanceToEndpoint:
            (routeDetails.routeLength - (currentPositionOnRoute.properties.location * 1000))
        }));
        let newNextWpIndex = nextWpIndex;
        while (newNextWpIndex < routeDetails.routeLegs.length - 1 &&
        routeDetails.routeLegs[newNextWpIndex].index <= currentPositionOnRoute.properties.index) {
          newNextWpIndex++;
        }
        if (newNextWpIndex > nextWpIndex) {
          this.store.dispatch(new SetNextWaypointIndexAction({ nextWaypointIndex: newNextWpIndex }));
        }

        const lineToNextWp = lineSlice(point([currentPosition.latitude, currentPosition.longitude]),
          point(routeDetails.routeLegs[nextWpIndex].coords),
          lineString(routePoints));
        const distanceToNextWp = length(lineToNextWp) * 1000;
        this.store.dispatch(new SetNextWaypointDistanceAction({ nextWaypointDistance: distanceToNextWp }));

      })
    ).subscribe();
  }

}
