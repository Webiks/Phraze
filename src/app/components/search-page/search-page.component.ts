import { Component, OnInit } from '@angular/core';
import { GeocodingService } from '../../modules/service-providers/services/geocoding/geocoding.service';
import { RoutesService } from '../../modules/service-providers/services/routes/routes.service';
import { select, Store } from '@ngrx/store';
import { SetPhrazeStateAction, SetRouteAction, SetShowRouteSummaryAction, SetShowSearchAction } from '../../store/nav.actions';
import { currentPositionSelector, getShowSearchSelector, routePointsSelector } from '../../store/nav.selectors';
import { PhrazeState } from '../../interface/nav.interface';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  searchResults;
  routePoints$;
  isShowSearch$;
  searchAddress = 'בן יהודה 5 ';


  constructor(private store: Store<any>,
              private geocodingService: GeocodingService,
              private routesService: RoutesService) {
    this.routePoints$ = this.store.pipe(
      select(routePointsSelector)
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
    this.store.pipe(
      select(currentPositionSelector),
      take(1),
      tap(currentPosition => {
        this.calcRoute(currentPosition, entry.coords);
        this.closeSearchPage();
        this.store.dispatch(new SetPhrazeStateAction({phrazeState: PhrazeState.PREVIEW}));
        this.store.dispatch(new SetShowRouteSummaryAction({isShowRouteSummary: true}));
      })
    ).subscribe();
  }

  calcRoute(from, to) {
    this.routesService.getRoute(from, to).subscribe(data => {
      this.store.dispatch(new SetRouteAction(data));
    });
  }

  closeSearchPage() {
    this.store.dispatch(new SetShowSearchAction({ isShowSearch: false }));
  }


}
