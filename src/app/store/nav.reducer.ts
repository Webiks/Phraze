import { NavInterface, PhrazeState } from '../interface/nav.interface';
import { NavActions, navActionTypes, SetPhrazeStateAction, SetRouteAction, SetShowSearchAction } from './nav.actions';


export const NavState: NavInterface = {
  routeDetails: {
    routePoints: [[]],
    routeDuration: null,
    routeLength: null,
    routeLegs: [{ coords: null, index: null, text: null }]
  },
  phrazeState: PhrazeState.IDLE,
  isShowSearch: false

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

    default:
      return state;
  }
}
