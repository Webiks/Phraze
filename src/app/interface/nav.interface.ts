
export interface NavInterface {
  routeDetails: RouteDetails;
  isActivePos: boolean;
  isShowSearch: boolean;
  isNavInProgress: boolean;
}

export interface RouteDetails {
  routePoints: [[]];
  routeLegs: Array<LegDetails>;
  routeLength: number;
  routeDuration: number;
}

export interface LegDetails {
  index: number;
  coords: [];
  text: string;
}

