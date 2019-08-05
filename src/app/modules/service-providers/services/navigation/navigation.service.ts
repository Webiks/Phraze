import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { lineString, nearestPointOnLine, point } from '@turf/turf';
import {
  currentPositionSelector,
  nextWaypointIndexSelector,
  routeDetailsSelector,
  routePointsSelector
} from '../../../../store/nav.selectors';
import { filter, tap, withLatestFrom } from 'rxjs/operators';
import { SetNextWaypointIndexAction } from '../../../../store/nav.actions';


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
        let newNextWpIndex = nextWpIndex;

        while (newNextWpIndex < routeDetails.routeLegs.length - 1 &&
        routeDetails.routeLegs[newNextWpIndex].index <= currentPositionOnRoute.properties.index) {
          newNextWpIndex++;
        }
        if (newNextWpIndex > nextWpIndex) {
          // TODO dispatch update
          console.log(`New WP update from ${nextWpIndex} to ${newNextWpIndex}`);
          this.store.dispatch(new SetNextWaypointIndexAction({ nextWaypointIndex: newNextWpIndex }));
        }
        // Calculate distance to next way point
      })
    ).subscribe();
  }

}
