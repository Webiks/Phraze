import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getRouteSelector } from '../../../../store/nav.selectors';
import { filter, map, tap } from 'rxjs/operators';
import { ActionType, MapsManagerService } from 'angular-cesium';
import { extractBoundingBox, flatenArrayOfArray, inflateBoundingBox, swapCoordinates } from '../../../../utils/utils';

@Component({
  selector: 'app-route-display',
  templateUrl: './route-display.component.html',
  styleUrls: ['./route-display.component.scss']
})
export class RouteDisplayComponent implements OnInit {

  displayedRoute$;
  mapId = 'map1';
  viewer;

  // todo: use camera service instead of map manager service
  constructor(private store: Store<any>,
              private mapsManagerService: MapsManagerService) {
  }

  ngOnInit() {
    this.viewer = this.mapsManagerService.getMap(this.mapId).getCesiumViewer();
    this.displayedRoute$ = this.store.pipe(
      select(getRouteSelector),
      filter(Boolean),
      tap(points => {
        let boundingBox = extractBoundingBox(points);
        boundingBox = inflateBoundingBox(boundingBox, 500);
        this.viewer.camera.flyTo({
            destination: Cesium.Rectangle.fromDegrees(boundingBox[0], boundingBox[1], boundingBox[2], boundingBox[3])
          }
        );

      }),
      map(points => swapCoordinates(points)),
      map(points => flatenArrayOfArray(points)),
      map(points => {
        return {
          id: 'moshesRoute',
          actionType: ActionType.ADD_UPDATE,
          entity: {
            id: 'moshesEntity',
            positions: Cesium.Cartesian3.fromDegreesArray(points),
            material: Cesium.Color.RED,
            outlineColor: Cesium.Color.GREEN,
            width: 5
          }
        };
      })
    );
  }

}
