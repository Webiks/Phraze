import { NavInterface, PhrazeState } from '../interface/nav.interface';
import {
  NavActions,
  navActionTypes,
  SetCurrentPositionAction,
  SetDistanceToEndpointAction,
  SetIsNextWpNotifiedAction,
  SetNextWaypointDistanceAction,
  SetNextWaypointIndexAction,
  SetPhrazeStateAction,
  SetRouteAction, SetShowRouteSummaryAction,
  SetShowSearchAction
} from './nav.actions';


export const NavState: NavInterface = {
  routeDetails: {
    routePoints: null,
    routeDuration: null,
    routeLength: null,
    routeLegs: [{ coords: null, index: null, text: null, maneuverType: null, name: null }]
  },
  phrazeState: PhrazeState.IDLE,
  isShowSearch: false,
  isShowRouteSummary: false,
  currentPosition: { latitude: null, longitude: null },
  nextWaypointIndex: null,
  nextWaypointDistance: null,
  isNextWpNotified: false,
  distanceToEndpoint: null,
  previousPosition: {latitude: null, longitude: null },
  currentPositionTimeStamp: null,
  previousPositionTimeStamp: null
};

export function navReducer(state = NavState, action: NavActions): NavInterface {
  switch (action.type) {
    case navActionTypes.SET_ROUTE: {
      const routeDetails = (action as SetRouteAction).payload.routeDetails;
      return { ...state, routeDetails: routeDetails };
    }
    case navActionTypes.SET_PHRAZE_STATE: {
      const phrazeState = (action as SetPhrazeStateAction).payload.phrazeState;
      return { ...state, phrazeState };
    }
    case navActionTypes.SET_SHOW_SEARCH: {
      const isShowSearch = (action as SetShowSearchAction).payload.isShowSearch;
      return { ...state, isShowSearch };
    }
    case navActionTypes.SET_SHOW_ROUTE_SUMMARY: {
      const isShowRouteSummary = (action as SetShowRouteSummaryAction).payload.isShowRouteSummary;
      return {...state, isShowRouteSummary};
    }
    case navActionTypes.SET_CURRENT_POSITION: {
      const currentPosition = (action as SetCurrentPositionAction).payload.currentPosition;
      const previousPosition = state.currentPosition;
      const previousPositionTimeStamp = state.currentPositionTimeStamp;
      const currentPositionTimeStamp = Date.now();
      return { ...state, currentPosition, previousPositionTimeStamp, currentPositionTimeStamp, previousPosition };
    }
    case navActionTypes.SET_NEXT_WAYPOINT_INDEX: {
      const nextWaypointIndex = (action as SetNextWaypointIndexAction).payload.nextWaypointIndex;
      return { ...state, nextWaypointIndex: nextWaypointIndex, isNextWpNotified: false };
    }
    case navActionTypes.SET_NEXT_WAYPOINT_DISTANCE: {
      const nextWaypointDistance = (action as SetNextWaypointDistanceAction).payload.nextWaypointDistance;
      return { ...state, nextWaypointDistance: nextWaypointDistance };
    }
    case navActionTypes.SET_DISTANCE_TO_ENDPOINT: {
      const distanceToEndpoint = (action as SetDistanceToEndpointAction).payload.distanceToEndpoint;
      return { ...state, distanceToEndpoint: distanceToEndpoint };
    }
    case navActionTypes.SET_IS_NEXT_WP_NOTIFIED: {
      const isNextWpNotified = (action as SetIsNextWpNotifiedAction).payload.isNextWpNotified;
      return {...state, isNextWpNotified };
    }
    default:
      return state;
  }
}
