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
          const entries = [];
          for (let i = 0; i < result.data.resourceSets[0].estimatedTotal; i++ ) {
            const entry = result.data.resourceSets[0].resources[i];
            const coords = entry.point.coordinates;
            const address = `${entry.address.addressLine}, ${entry.address.locality}`;
            entries.push({address: address , coords: { latitude: coords[0], longitude: coords[1] }});
          }
          resultSubject.next(entries);
        } catch (err) {
          console.error('getLocation', err);
          resultSubject.next({ err });
        }
      });
    return resultSubject;
  }
}
