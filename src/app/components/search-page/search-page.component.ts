import { Component, OnInit } from '@angular/core';
import { GeocodingService } from '../../modules/service-providers/services/geocoding/geocoding.service';
import { RoutesService } from '../../modules/service-providers/services/routes/routes.service';
import { GeolocationService } from '../../modules/service-providers/services/position/geolocation.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

   $searchResults;
   $routePoints;
   currentPosition;

  constructor(private geocodingService: GeocodingService,
              private routesService: RoutesService,
              private geolocationService: GeolocationService) { }

  ngOnInit() {

  }

  getCode(address: string) {
    this.geocodingService.getGeocode(address).subscribe(destinationCoords => {
     this.$searchResults = destinationCoords;
     this.currentPosition = this.geolocationService.lastPos.coords;
     console.log(destinationCoords.lat + ' ' + destinationCoords.lon + ' these are the destination coords');
     this.calcRoute(this.currentPosition, destinationCoords);
     });
      }




  calcRoute(from, to) {
    this.routesService.getRoute(from, to).subscribe( data => {
      console.log(data);
      this.$routePoints = data;
    });
  }




}
