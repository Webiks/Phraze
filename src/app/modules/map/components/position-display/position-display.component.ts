import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActionType, MapsManagerService } from 'angular-cesium';
import { Observable } from 'rxjs';
import { GeolocationService } from '../../../service-providers/services/position/geolocation.service';
import { combineLatest, filter, map, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { currentPositionSelector, phrazeStateSelector } from '../../../../store/nav.selectors';
import { PhrazeState } from '../../../../interface/nav.interface';

@Component({
  selector: 'app-position-display',
  templateUrl: './position-display.component.html',
  styleUrls: ['./position-display.component.scss']
})
export class PositionDisplayComponent implements OnInit, AfterViewInit {

  postionUpdate$: Observable<any>;
  viewer;


  constructor(private geolocationService: GeolocationService,
              private mapsManagerService: MapsManagerService,
              private store: Store<any>
  ) {

    this.postionUpdate$ = this.store.pipe(select(currentPositionSelector),
      combineLatest(this.store.pipe(select(phrazeStateSelector))),
      map(data => ({ position: data[0], phrazeState: data[1] })),
      filter(({ position, phrazeState }) => position.lat !== null && phrazeState !== PhrazeState.PREVIEW),
      map(({ position }) => position),
      tap(position => this.flyToPosition(position)),
      map(position => {
        return {
          id: 'currentPosition',
          entity: {
            id: 'currentPosition',
            position: Cesium.Cartesian3.fromDegrees(position.lon, position.lat, 10.0)
          },
          actionType: ActionType.ADD_UPDATE
        };
      })
    );
    this.postionUpdate$.subscribe(); // TOO unsubscribe
  }

  flyToPosition(position) {
    this.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(position.lon, position.lat, 1000.0)
      }
    );
  }

  ngOnInit() {
    this.viewer = this.mapsManagerService.getMap('map1').getCesiumViewer();
  }

  ngAfterViewInit(): void {
  }


}
