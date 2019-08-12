import { Component, OnInit } from '@angular/core';
import { SetNextWaypointIndexAction, SetPhrazeStateAction, SetShowRouteSummaryAction } from '../../store/nav.actions';
import { PhrazeState } from '../../interface/nav.interface';
import { select, Store } from '@ngrx/store';
import { getNavState, routePointsSelector, showRouteSummarySelector } from '../../store/nav.selectors';
import { filter, tap } from 'rxjs/operators';
import { toTimeString } from '../../utils/utils';

@Component({
  selector: 'app-route-summary-display',
  templateUrl: './route-summary-display.component.html',
  styleUrls: ['./route-summary-display.component.scss']
})
export class RouteSummaryDisplayComponent implements OnInit {
  routeLength$;
  routeDuration$;
  isShowRouteSummary$;

  constructor(private store: Store<any>) {
    this.isShowRouteSummary$ = this.store.pipe(select(showRouteSummarySelector));
    this.store.pipe(select(getNavState),
      filter((stateData) => stateData.routeDetails.routeLength !== null),
      tap((stateData) => {
        this.routeLength$ = Math.round(stateData.routeDetails.routeLength);
        this.routeDuration$ = toTimeString(stateData.routeDetails.routeDuration);
      })
    ).subscribe();
  }


  ngOnInit() {
  }

  startNavigation() {
    this.store.dispatch(new SetPhrazeStateAction({ phrazeState: PhrazeState.NAVIGATION }));
    this.store.dispatch(new SetNextWaypointIndexAction({ nextWaypointIndex: 1 }));
    this.closeRouteSummary();
    this.store.pipe(
      select(routePointsSelector),
      tap(route => {
        const from = <any>route[0];
        const to = <any>route[route.length - 1];
        window.addEventListener('message', handleGetRouteCallback);
        window.postMessage({
            type: 'getRoute',
            from: `${from[0]},${from[1]}`,
            to: `${to[0]},${to[1]}`
          },
          '*');
      })
    ).subscribe();

    function handleGetRouteCallback(event) {
      if (!event || !event.data || event.data.type !== 'getRouteCallback') {
        return;
      }
      window.removeEventListener('message', handleGetRouteCallback);
      window.postMessage({
          type: 'playRoute',
          playbackRate: 2.3
        },
        '*');
    }
  }

  closeRouteSummary() {
    this.store.dispatch(new SetShowRouteSummaryAction({ isShowRouteSummary: false }));
  }




}
