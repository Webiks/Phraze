import { Component, OnInit } from '@angular/core';
import { GeocodingService } from '../../modules/service-providers/services/geocoding/geocoding.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

   $searchResults;

  constructor(private geocoding: GeocodingService) { }

  ngOnInit() {

  }

  getCode(address: string) {
    this.geocoding.getGeocode(address).subscribe(data => {
     this.$searchResults = data;
     console.log('this is the data: ' + data.lat);
     console.log(data);
    });

  }




}
