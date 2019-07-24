import { NavInterface } from '../interface/nav.interface';
import { NavActions, navActionTypes, SetRoute } from './nav.actions';


export const NavState: NavInterface = { route: null };

export function navReducer( state = NavState, action: NavActions): NavInterface {
  switch (action.type) {
    case navActionTypes.SET_ROUTE: {
      const currentRoute = (action as SetRoute).payload.points;
      const currentSetRouteState =  state;
      currentSetRouteState.route = currentRoute;
      return currentSetRouteState;
    }
    default:
      return state;
  }
}
