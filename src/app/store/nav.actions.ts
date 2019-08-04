import { Action } from '@ngrx/store';
import { PhrazeState, RouteDetails } from '../interface/nav.interface';


export enum navActionTypes {
  SET_ROUTE = 'SET ROUTE',
  SET_PHRAZE_STATE = 'SET PHRAZE STATE',
  SET_SHOW_SEARCH = 'SET SHOW SEARCH',
  SET_CURRENT_POSITION = 'SET CURRENT POSITION'
}

export interface SetRoutePayload {routeDetails: RouteDetails; }
export class SetRouteAction implements Action {
  type = navActionTypes.SET_ROUTE;
  constructor(public payload: SetRoutePayload) {
  }
}

export interface SetPhrazeStatePayload {phrazeState: PhrazeState; }
export class SetPhrazeStateAction implements Action {
  type = navActionTypes.SET_PHRAZE_STATE;
  constructor(public payload: SetPhrazeStatePayload) {
  }
}

export interface SetShowSearchPayload { isShowSearch: boolean; }
export class SetShowSearchAction implements Action {
  type = navActionTypes.SET_SHOW_SEARCH;
  constructor(public payload: SetShowSearchPayload) {
  }
}

export interface SetCurrentPositionPayload {currentPosition: {lat: number, lon: number}; }
export class SetCurrentPositionAction implements Action {
  type = navActionTypes.SET_CURRENT_POSITION;
  constructor(public payload: SetCurrentPositionPayload) {
  }
}

export type NavActions =  SetRouteAction |
                          SetPhrazeStateAction |
                          SetShowSearchAction |
                          SetCurrentPositionAction;
