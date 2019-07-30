import { NavInterface, RouteDetails } from '../interface/nav.interface';
import { NavActions, navActionTypes, SetActiveNavAction, SetRouteAction, SetShowSearchAction } from './nav.actions';


export const NavState: NavInterface = {
  routeDetails: {
    routePoints: [[]],
    routeDuration: null,
    routeLength: null,
    routeLegs: [{ coords: null, index: null, text: null }]
  },
  isActiveNav: true,
  isShowSearch: false
};

export function navReducer(state = NavState, action: NavActions): NavInterface {
  switch (action.type) {
    case navActionTypes.SET_ROUTE: {
      const routeDetails = (action as SetRouteAction).payload.routeDetails;
      return { ...state, routeDetails: routeDetails };
    }
    case navActionTypes.SET_ACTIVE_NAV: {
      const isActiveNav = (action as SetActiveNavAction).payload.isActiveNav;
      return { ...state, isActiveNav };
    }
    case navActionTypes.SET_SHOW_SEARCH: {
      const isShowSearch = (action as SetShowSearchAction).payload.isShowSearch;
      return { ...state, isShowSearch };
    }
    default:
      return state;
  }
}
