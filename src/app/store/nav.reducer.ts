import { NavInterface } from '../interface/nav.interface';
import { NavActions, navActionTypes, SetActiveNavAction, SetRouteAction, SetShowSearchAction } from './nav.actions';


export const NavState: NavInterface = { route: null, isActiveNav: true, isShowSearch: false};

export function navReducer(state = NavState, action: NavActions): NavInterface {
  switch (action.type) {
    case navActionTypes.SET_ROUTE: {
      const route = (action as SetRouteAction).payload.points;
      return { ...state, route };
    }
    case navActionTypes.SET_ACTIVE_NAV: {
      const isActiveNav = (action as SetActiveNavAction).payload.isActiveNav;
      return { ...state, isActiveNav };
    }
    case navActionTypes.SET_SHOW_SEARCH: {
      const isShowSearch = (action as SetShowSearchAction).payload.isShowSearch;
      console.log('supposes to show search');
      return {...state, isShowSearch};
    }
    default:
      return state;
  }
}
