import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SetNextWaypointIndexAction, SetPhrazeStateAction, SetShowSearchAction } from '../../store/nav.actions';
import { distanceToEndpointSelector, routePointsSelector } from '../../store/nav.selectors';
import { tap } from 'rxjs/operators';
import { PhrazeState } from '../../interface/nav.interface';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.scss']
})
export class ControlBarComponent implements OnInit {

  distanceToEndpoint$;

  constructor(private store: Store<any>) {
    this.distanceToEndpoint$ = this.store.pipe(select(distanceToEndpointSelector));
  }

  ngOnInit() {

  }

  openSearchPage() {
    this.store.dispatch(new SetShowSearchAction({isShowSearch: true}));
  }
}
