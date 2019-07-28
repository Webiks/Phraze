import { Component, OnInit } from '@angular/core';
import { MapLayerProviderOptions, MapsManagerService, ViewerConfiguration } from 'angular-cesium';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  mapLayerProviderOptions = MapLayerProviderOptions;

  mapId = 'map1';
  viewer;


  ionToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMWY3MDBjYi1hM2NmLTRiY2YtYTM3My1mMTk5MjFiYTg5NDUiLCJpZ' +
    'CI6NjU0Miwic2NvcGVzIjpbImFzbCIsImFzciIsImFzdyIsImdjIl0sImFzc2V0cyI6WzIsM10sImlhdCI6MTU1MTM0NzUzNH0.iLuDmwFBzHKNiEIoYBakVCiwNS' +
    '1xZyen-2GJAZ9fjJk';

  providerOptions = {
    url: 'https://dev.virtualearth.net',
    key: 'AmJ0O28GqMP3Dh1xqajFAFMuKb9f0YCXtGWJ5G4NU_PeE899SYup3ngALmDschnu',
    DEFAULT_VIEW_FACTOR: 0,

  };

  viewerConfigurationOptions = {
    skyBox: false,
    timeline: false,
    selectionIndicator: false,
    fullscreenButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    geocoder: false,
    animation: false,
    frameState: {scene: {creditDisplay: false}},
    terrainProviderViewModels: [],
    baseLayerPicker: false,
    infoBox: false,
    skyAtmosphere: false,
    homeButton: false,
    contextOptions: {
      webgl: {
        alpha: true
      }
    }
  };

  static logLocation(position) {
    console.log('Latitude: ' + position.coords.latitude);
    console.log('Longitude: ' + position.coords.longitude);
  }

  constructor(private mapsManagerService: MapsManagerService, viewerConfiguration: ViewerConfiguration) {
     Cesium.Ion.defaultAccessToken = this.ionToken;
     viewerConfiguration.viewerOptions = this.viewerConfigurationOptions;
     this.mapsManagerService = mapsManagerService;
  }



  ngOnInit() {

    this.getLocation();
  }

  goToCurrentLocation() {
    this.viewer = this.mapsManagerService.getMap(this.mapId).getCesiumViewer();
    navigator.geolocation.getCurrentPosition(this.flyToPosition.bind(this));
  }

  flyToPosition(position) {
    this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude, 1000.0)
      }
    );
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(MapComponent.logLocation);
  }
}
