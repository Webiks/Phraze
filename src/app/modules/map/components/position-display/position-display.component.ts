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
      tap(([ position, state, heading ]) => this.flyToPosition(position, state, heading)),
      map(([ position, state, heading ]) => {
        const modelHeading = 180;
        const entityPosition = Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude);
        const hpr = Cesium.HeadingPitchRoll.fromDegrees((heading || 0) + modelHeading, 0, 0);
        const orientation = Cesium.Transforms.headingPitchRollQuaternion(entityPosition, hpr);
        return {
          id: 'currentPosition',
          entity: {
            id: 'currentPosition',
            position: entityPosition,
            orientation
          },
          actionType: ActionType.ADD_UPDATE
        };
      })
    );
    this.postionUpdate$.subscribe(); // TODO unsubscribe
  }

  flyToPosition(position: GeoPosition, state: PhrazeState, heading: number) {
    const entityPosition = Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude);
    const cameraHeading = Cesium.Math.toRadians(heading || 0);
    const pitch = Cesium.Math.toRadians(-30);
    const range = 500;
    const cameraOrientation = new Cesium.HeadingPitchRange(cameraHeading, pitch, range);
    if (state === PhrazeState.NAVIGATION) {
      this.viewer.camera.lookAt(entityPosition, cameraOrientation);
    } else {
      this.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude, 1000)
        });
    }
  }

  ngOnInit() {
    this.viewer = this.mapsManagerService.getMap('map1').getCesiumViewer();
  }

  ngAfterViewInit(): void {
  }


}
