import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { AngularCesiumModule, AngularCesiumWidgetsModule, ViewerConfiguration } from 'angular-cesium';
import { PositionDisplayComponent } from './components/position-display/position-display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { RouteDisplayComponent } from './components/route-display/route-display.component';

@NgModule({
  declarations: [
    MapComponent,
    PositionDisplayComponent,
    RouteDisplayComponent
  ],
  imports: [
    CommonModule,
    AngularCesiumModule,
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  exports: [
    MapComponent
  ],
  providers: [ViewerConfiguration]
})
export class MapModule { }
