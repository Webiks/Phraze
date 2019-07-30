
export interface NavInterface {
  routeDetails: RouteDetails;
  isActiveNav: boolean;
  isShowSearch: boolean;
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

