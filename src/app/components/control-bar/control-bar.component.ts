import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SetActivePosAction, SetShowSearchAction } from '../../store/nav.actions';
import { routePointSelector } from '../../store/nav.selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.scss']
})
export class ControlBarComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

  openSearchPage() {
    this.store.dispatch(new SetShowSearchAction({isShowSearch: true}));
  }

  startNavigation() {
    this.store.dispatch(new SetActivePosAction({isActivePos: true}));
    this.store.pipe(
      select(routePointSelector),
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
          playbackRate: 1.5
        },
        '*');
    }



  }

}
