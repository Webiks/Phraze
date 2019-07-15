import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlBarComponent } from './components/control-bar/control-bar.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { MapComponent } from './components/map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    ControlBarComponent,
    SearchPageComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
