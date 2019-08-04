import { Component } from '@angular/core';
import { GeolocationService } from './modules/service-providers/services/position/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Phraze';

  constructor(private geolocationService: GeolocationService) {}
}
