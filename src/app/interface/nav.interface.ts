
export interface NavInterface {
  routeDetails: RouteDetails;
  phrazeState: PhrazeState;
  isShowSearch: boolean;
  isShowRouteSummary: boolean;
  currentPosition: GeoPosition;
  nextWaypointIndex: number;
  nextWaypointDistance: number;
  isNextWpNotified: boolean;
  distanceToEndpoint: number;
  previousPosition: GeoPosition;
  previousPositionTimeStamp: number;
  currentPositionTimeStamp: number;
}

export interface RouteDetails {
  routePoints: [[]];
  routeLegs: Array<LegDetails>;
  routeLength: number;
  routeDuration: number;
}

export interface LegDetails {
  index: number;
  coords: Array<number>;
  text: string;
  maneuverType: string;
  name: string;
}

export enum PhrazeState {
  IDLE = 'IDLE',
  PREVIEW = 'PREVIEW',
  NAVIGATION = 'NAVIGATION'
}

export interface GeoPosition {
  latitude: number;
  longitude: number;
}


