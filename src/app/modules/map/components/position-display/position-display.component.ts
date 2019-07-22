import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActionType, MapsManagerService } from 'angular-cesium';
import { Observable } from 'rxjs';
import { GeolocationService } from '../../../service-providers/services/position/geolocation.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-position-display',
  templateUrl: './position-display.component.html',
  styleUrls: ['./position-display.component.scss']
})
export class PositionDisplayComponent implements OnInit, AfterViewInit {

  postionUpdate$: Observable<any>;
  viewer;


  constructor(private getPositionService: GeolocationService,
              private mapsManagerService: MapsManagerService
              ) {

    this.postionUpdate$ = getPositionService.positionUpdate$.pipe(
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
      }));
    this.postionUpdate$.subscribe(); // TOO unsubscribe
  }

  flyToPosition(position) {
    this.viewer.camera.flyTo({
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
