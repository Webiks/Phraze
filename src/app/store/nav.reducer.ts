import { NavInterface } from '../interface/nav.interface';
import { NavActions, navActionTypes, SetRouteAction } from './nav.actions';


export const NavState: NavInterface = { route: null};

export function navReducer(state = NavState, action: NavActions): NavInterface {
  switch (action.type) {
    case navActionTypes.SET_ROUTE: {
      const route = (action as SetRouteAction).payload.points;
      console.log(`set route reducer: ${route}`);
      return { ...state, route };
    }
    default:
      return state;
  }
}
