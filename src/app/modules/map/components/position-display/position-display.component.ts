import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActionType, MapsManagerService } from 'angular-cesium';
import { Observable } from 'rxjs';
import { combineLatest, filter, map, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { currentPositionHeadingSelector, currentPositionSelector, phrazeStateSelector } from '../../../../store/nav.selectors';
import { GeoPosition, PhrazeState } from '../../../../interface/nav.interface';

@Component({
  selector: 'app-position-display',
  templateUrl: './position-display.component.html',
  styleUrls: ['./position-display.component.scss']
})
export class PositionDisplayComponent implements OnInit, AfterViewInit {

  postionUpdate$: Observable<any>;
  viewer;


  constructor(private mapsManagerService: MapsManagerService,
              private store: Store<any>
  ) {

    this.postionUpdate$ = this.store.pipe(select(currentPositionSelector),
      combineLatest(this.store.pipe(select(phrazeStateSelector)), this.store.pipe(select(currentPositionHeadingSelector))),
      filter(([ position, phrazeState, heading ]) => position.latitude !== null && phrazeState !== PhrazeState.PREVIEW),
      tap(([ position, state, heading ]) => this.flyToPosition(position, heading)),
      map(([ position ]) => {
        return {
          id: 'currentPosition',
          entity: {
            id: 'currentPosition',
            position: Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude, 10.0)
          },
          actionType: ActionType.ADD_UPDATE
        };
      })
    );
    this.postionUpdate$.subscribe(); // TODO unsubscribe
  }

  flyToPosition(position: GeoPosition, heading: number) {
    if (heading === undefined) {
      heading = 0;
    }
    const entityPosition = Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude);
    const cameraHeading = Cesium.Math.toRadians(heading);
    const pitch = Cesium.Math.toRadians(-30);
    const range = 500;
    const cameraOrientation = new Cesium.HeadingPitchRange(cameraHeading, pitch, range);
    this.viewer.camera.lookAt(entityPosition, cameraOrientation);
  }

  ngOnInit() {
    this.viewer = this.mapsManagerService.getMap('map1').getCesiumViewer();
  }

  ngAfterViewInit(): void {
  }


}
