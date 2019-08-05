import { Inject, Injectable } from '@angular/core';
import { BINGPROVIDER_CONFIG } from '../../config/bingProvider.config';
import { BingProviderInterface } from '../../interface/bingProvider.interface';
import { Observable, Subject } from 'rxjs';
import axios from 'axios';
import { LegDetails, RouteDetails } from '../../../../interface/nav.interface';
import {nearestPointOnLine, lineString, point} from '@turf/turf';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(@Inject(BINGPROVIDER_CONFIG) public bingProviderConfig: BingProviderInterface) { }

  getRoute(from, to): Observable<any> {
    function mapLegs(rawLegs): Array<LegDetails> {
      const mapedLegs = new Array<LegDetails>();
      rawLegs.forEach(leg => {
        const currentLeg: LegDetails = <LegDetails>{};
        currentLeg.text = leg.instruction.text;
        currentLeg.coords = leg.maneuverPoint.coordinates;
        currentLeg.index = 0;
        mapedLegs.push(currentLeg);
      });
      return mapedLegs;
    }

    function roundCoordinate(num: number) {
      return Math.round(num * 10000) / 10000;
    }

    function indexLegs(mapedLegs, linePoints ): Array<LegDetails> {
      const line = lineString(linePoints);
      mapedLegs.forEach(leg => {
        const near = nearestPointOnLine(line, point(leg.coords));
        leg.coords = near.geometry.coordinates;
      });

      let j = 0;
      for (let i = 0; i < linePoints.length; i++) {
        if (roundCoordinate(mapedLegs[j].coords[0]) === roundCoordinate(linePoints[i][0]) &&
          roundCoordinate(mapedLegs[j].coords[1]) === roundCoordinate(linePoints[i][1])) {
          mapedLegs[j].index = i;
          j++;
        }
      }
      return mapedLegs;
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
        routeDetails.routeLegs = mapLegs(routeBase.routeLegs[0].itineraryItems);
        routeDetails.routeLegs = indexLegs(routeDetails.routeLegs, routeDetails.routePoints);
        resultSubject.next({routeDetails});
      } catch (err) {
        console.error('getRoute', err);
        resultSubject.next({ err });
      }
    });
    return resultSubject;
  }
}
