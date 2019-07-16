import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlBarComponent } from './components/control-bar/control-bar.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { MatButtonModule } from '@angular/material';
import { MapModule } from './modules/map/map.module';


@NgModule({
  declarations: [
    AppComponent,
    ControlBarComponent,
    SearchPageComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MapModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
