import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import axios from 'axios';
import { BINGPROVIDER_CONFIG } from '../../config/bingProvider.config';
import { BingProviderInterface } from '../../interface/bingProvider.interface';


@Injectable({
  providedIn: 'root'
})
export class GeocodingService {


  constructor(@Inject(BINGPROVIDER_CONFIG) public bingProviderConfig: BingProviderInterface) {

  }


  getGeocode(address): Observable<any> {
    const resultSubject = new Subject<any>();
    const url = this.bingProviderConfig.geoCodingUrl.replace('{location}',
      encodeURIComponent(address)).replace('{key}', this.bingProviderConfig.ApiKey);
    axios.get(url)
      .then((result) => {
        try {
          const coords = result.data.resourceSets[0].resources[0].point.coordinates;
          resultSubject.next({ lat: coords[0], lon: coords[1] });
        } catch (err) {
          console.error('getLocation', err);
          resultSubject.next({ err });
        }
      });
    return resultSubject;
  }
}
