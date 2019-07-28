import { Inject, Injectable } from '@angular/core';
import { BINGPROVIDER_CONFIG } from '../../config/bingProvider.config';
import { BingProviderInterface } from '../../interface/bingProvider.interface';
import { Observable, Subject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(@Inject(BINGPROVIDER_CONFIG) public bingProviderConfig: BingProviderInterface) { }

  getRoute(from, to): Observable<any> {
    const resultSubject = new Subject<any>();
    const url = this.bingProviderConfig.routeUrl.replace('{from}', from.latitude + ',' +  from.longitude)
      .replace('{to}', to.latitude + ',' + to.longitude)
      .replace('{key}', this.bingProviderConfig.ApiKey);
    axios.get(url).then((result) => {
      try {
        const points = result.data.resourceSets[0].resources[0].routePath.line.coordinates;
        resultSubject.next({points});
      } catch (err) {
        console.error('getRoute', err);
        resultSubject.next({ err });
      }
    });
    return resultSubject;
  }
}
