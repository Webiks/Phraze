import { Component, OnInit } from '@angular/core';
import { MapLayerProviderOptions, MapsManagerService, ViewerConfiguration } from 'angular-cesium';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  mapLayerProviderOptions = MapLayerProviderOptions;

  mapid = 'map1';

  ionToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMWY3MDBjYi1hM2NmLTRiY2YtYTM3My1mMTk5MjFiYTg5NDUiLCJpZ' +
    'CI6NjU0Miwic2NvcGVzIjpbImFzbCIsImFzciIsImFzdyIsImdjIl0sImFzc2V0cyI6WzIsM10sImlhdCI6MTU1MTM0NzUzNH0.iLuDmwFBzHKNiEIoYBakVCiwNS' +
    '1xZyen-2GJAZ9fjJk';

  providerOptions = {
    url: 'https://dev.virtualearth.net',
    key: 'AmJ0O28GqMP3Dh1xqajFAFMuKb9f0YCXtGWJ5G4NU_PeE899SYup3ngALmDschnu',
    DEFAULT_VIEW_FACTOR: 0,
    baseLayerPicker: false
  };

  viewerConfigurationOptions = {
    skyBox: false,
    skyAtmosphere: false,
    contextOptions: {
      webgl: {
        alpha: true
      }
    }
  };

  constructor(private mapsManagerService: MapsManagerService, viewerConfiguration: ViewerConfiguration) {
     Cesium.Ion.defaultAccessToken = this.ionToken;
     viewerConfiguration.viewerOptions = this.viewerConfigurationOptions;
     this.mapsManagerService = mapsManagerService;
  }

  ngOnInit() {
  }

}
