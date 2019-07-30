import { Inject, Injectable } from '@angular/core';
import { BINGPROVIDER_CONFIG } from '../../config/bingProvider.config';
import { BingProviderInterface } from '../../interface/bingProvider.interface';
import { Observable, Subject } from 'rxjs';
import axios from 'axios';
import { LegDetails, RouteDetails } from '../../../../interface/nav.interface';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(@Inject(BINGPROVIDER_CONFIG) public bingProviderConfig: BingProviderInterface) { }

  getRoute(from, to): Observable<any> {
    function indexLegs(rawLegs): Array<LegDetails> {
      const indexedLegs = new Array<LegDetails>();

      return indexedLegs;
    }
    const resultSubject = new Subject<any>();
    const routeDetails: RouteDetails = new class implements RouteDetails {
      routeDuration: number;
      routeLegs: [LegDetails];
      routeLength: number;
      routePoints: [[]];
    };
    const url = this.bingProviderConfig.routeUrl.replace('{from}', from.latitude + ',' +  from.longitude)
      .replace('{to}', to.latitude + ',' + to.longitude)
      .replace('{key}', this.bingProviderConfig.ApiKey);
    axios.get(url).then((result) => {
      try {
        const routeBase = result.data.resourceSets[0].resources[0];
        routeDetails.routePoints = routeBase.routePath.line.coordinates;
        routeDetails.routeLength = routeBase.travelDistance;
        routeDetails.routeDuration = routeBase.travelDuration;
        routeDetails.routeLegs = indexLegs(routeBase.routeLegs);
        resultSubject.next({routeDetails});
      } catch (err) {
        console.error('getRoute', err);
        resultSubject.next({ err });
      }
    });
    return resultSubject;
  }
}
