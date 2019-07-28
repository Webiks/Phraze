import { Component, OnInit } from '@angular/core';
import { GeocodingService } from '../../modules/service-providers/services/geocoding/geocoding.service';
import { RoutesService } from '../../modules/service-providers/services/routes/routes.service';
import { GeolocationService } from '../../modules/service-providers/services/position/geolocation.service';
import { select, Store } from '@ngrx/store';
import { SetActiveNavAction, SetRouteAction, SetShowSearchAction } from '../../store/nav.actions';
import { getRouteSelector, getShowSearchSelector } from '../../store/nav.selectors';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  searchResults;
  routePoints$;
  currentPosition;
  isShowSearch$;
  searchAddress = 'בן יהודה 5 ';


  constructor(private store: Store<any>,
              private geocodingService: GeocodingService,
              private routesService: RoutesService,
              private geolocationService: GeolocationService) {
    this.routePoints$ = this.store.pipe(
      select(getRouteSelector)
    );
    this.isShowSearch$ = this.store.pipe(
      select(getShowSearchSelector)
    );
  }

  ngOnInit() {

  }

  searchAddresses(address: string) {
    this.geocodingService.getGeocode(address).subscribe(searchResults => {
      this.searchResults = searchResults;
    });
  }

  selectDestination(entry) {
    this.currentPosition = this.geolocationService.lastPos.coords;
    this.calcRoute(this.currentPosition, entry.coords);
    this.closeSearchPage();
    this.store.dispatch(new SetActiveNavAction({isActiveNav: false}));
  }

  calcRoute(from, to) {
    this.routesService.getRoute(from, to).subscribe(data => {
      console.log(data);
      this.store.dispatch(new SetRouteAction(data));
    });
  }

  closeSearchPage() {
    this.store.dispatch(new SetShowSearchAction({ isShowSearch: false }));
  }


}
