import { NavInterface, PhrazeState } from '../interface/nav.interface';
import {
  NavActions,
  navActionTypes,
  SetCurrentPositionAction, SetNextWaypointDistanceAction, SetNextWaypointIndexAction,
  SetPhrazeStateAction,
  SetRouteAction,
  SetShowSearchAction
} from './nav.actions';


export const NavState: NavInterface = {
  routeDetails: {
    routePoints: [[]],
    routeDuration: null,
    routeLength: null,
    routeLegs: [{ coords: null, index: null, text: null }]
  },
  phrazeState: PhrazeState.IDLE,
  isShowSearch: false,
  currentPosition: { latitude: null, longitude: null },
  nextWaypointIndex: null,
  nextWaypointDistance: null
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
    case navActionTypes.SET_CURRENT_POSITION: {
      const currentPosition = (action as SetCurrentPositionAction).payload.currentPosition;
      return { ...state, currentPosition };
    }
    case navActionTypes.SET_NEXT_WAYPOINT_INDEX: {
      const nextWaypointIndex = (action as SetNextWaypointIndexAction).payload.nextWaypointIndex;
      return { ...state, nextWaypointIndex: nextWaypointIndex };
    }
    case navActionTypes.SET_NEXT_WAYPOINT_DISTANCE: {
      const nextWaypointDistance = (action as SetNextWaypointDistanceAction).payload.nextWaypointDistance;
      return { ...state, nextWaypointDistance: nextWaypointDistance };
    }
    default:
      return state;
  }
}
