import { NavInterface } from '../interface/nav.interface';
import { NavActions, navActionTypes, SetActivePosAction, SetNavInProgressAction, SetRouteAction, SetShowSearchAction } from './nav.actions';


export const NavState: NavInterface = {
  routeDetails: {
    routePoints: [[]],
    routeDuration: null,
    routeLength: null,
    routeLegs: [{ coords: null, index: null, text: null }]
  },
  isActivePos: true,
  isShowSearch: false,
  isNavInProgress: false
};

export function navReducer(state = NavState, action: NavActions): NavInterface {
  switch (action.type) {
    case navActionTypes.SET_ROUTE: {
      const routeDetails = (action as SetRouteAction).payload.routeDetails;
      return { ...state, routeDetails: routeDetails };
    }
    case navActionTypes.SET_ACTIVE_POS: {
      const isActiveNav = (action as SetActivePosAction).payload.isActivePos;
      return { ...state, isActivePos: isActiveNav };
    }
    case navActionTypes.SET_SHOW_SEARCH: {
      const isShowSearch = (action as SetShowSearchAction).payload.isShowSearch;
      return { ...state, isShowSearch };
    }
    case navActionTypes.SET_NAV_IN_PROGRESS: {
      const isNavInProgress = (action as SetNavInProgressAction).payload.isNavInProgress;
      return { ...state, isNavInProgress};
    }
    default:
      return state;
  }
}
