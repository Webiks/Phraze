import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  nextWaypointDistanceSelector,
  nextWaypointIndexSelector,
  phrazeStateSelector,
  routeDetailsSelector
} from '../../store/nav.selectors';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { PhrazeState } from '../../interface/nav.interface';

@Component({
  selector: 'app-instructions-display',
  templateUrl: './instructions-display.component.html',
  styleUrls: ['./instructions-display.component.scss']
})
export class InstructionsDisplayComponent implements OnInit {
  distanceToNextWaypoint$;
  nextWaypoint$;
  nextWaypointManeuver$;
  nextWaypointName$;
  phrazeState$;
  navStateValue = PhrazeState.NAVIGATION;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {

    this.distanceToNextWaypoint$ = this.store.pipe(select(nextWaypointDistanceSelector),
      map(distance => Math.round(distance)));
    this.phrazeState$ = this.store.pipe(select(phrazeStateSelector));

    this.nextWaypoint$ = this.store.pipe(select(nextWaypointIndexSelector),
      withLatestFrom(this.store.pipe(select(routeDetailsSelector)), this.store.pipe(select(phrazeStateSelector))),
      filter(([nextWpIndex, routeDetails, navState]) => navState === PhrazeState.NAVIGATION));

    this.nextWaypointManeuver$ = this.nextWaypoint$.pipe(
      map(([nextWpIndex, routeDetails, navState]) => routeDetails.routeLegs[nextWpIndex].maneuverType)
    );

    this.nextWaypointName$ = this.nextWaypoint$.pipe(
      map(([nextWpIndex, routeDetails, navState]) => routeDetails.routeLegs[nextWpIndex].name)
    );
  }
}
