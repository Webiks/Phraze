import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { nextWaypointIndexSelector, phrazeStateSelector, routeDetailsSelector } from '../../../../store/nav.selectors';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { PhrazeState } from '../../../../interface/nav.interface';
import { ActionType } from 'angular-cesium';

@Component({
  selector: 'app-next-wp-display',
  templateUrl: './next-wp-display.component.html',
  styleUrls: ['./next-wp-display.component.scss']
})
export class NextWpDisplayComponent implements OnInit {

  nextWpUpdate$: Observable<any>;
  pinBuilder = new Cesium.PinBuilder();

  constructor(private store: Store<any>) {
    this.nextWpUpdate$  = this.store.pipe(
      select(nextWaypointIndexSelector),
      withLatestFrom(this.store.pipe(select(routeDetailsSelector)), this.store.pipe(select(phrazeStateSelector))),
      filter(([nextWp, routeDetails, phrazeState]) => phrazeState === PhrazeState.NAVIGATION &&
            nextWp !== null && routeDetails !== null),
      map(([nextWp, routeDetails ]) => {
        const coords = routeDetails.routeLegs[nextWp].coords;
        return {
          id: 'nextWayPoint',
          entity: {
            id: 'nextWayPoint',
            position: Cesium.Cartesian3.fromDegrees(coords[1], coords[0], 10.0 ),
            image: this.pinBuilder.fromText('wp', Cesium.Color.BLACK, 48).toDataURL(),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          },
          actionType: ActionType.ADD_UPDATE
        };
      })
    );
    this.nextWpUpdate$.subscribe();
  }

  ngOnInit() {
  }

}
